import { User } from "../entites/User";
import { RegisterInput } from "../types/RegisterInput";
import { UserMutationResponse } from "../types/UserMutationResponse";
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { validateRegisterInput } from "../utils/validateRegisterInput";
import { LoginInput } from "../types/LoginInput";
import { Context } from "../types/Context";
import { COOKIE_NAME } from "../constant";
import { UpdateUserInput } from "../types/UpdateUserInput";
import { checkAuth } from "../middleware/checkAuth";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { gc } from "../services/googleCloud";
import { ForgotPasswordInput } from "../types/ForgotPasswordInput";
import { sendEmail } from "../utils/sendEmail";
import { TokenModel } from "../models/Token";
import { v4 as uuidv4 } from "uuid";
import { ChangePasswordInput } from "../types/ChangePasswordInput";
import { Course } from "../entites/Course";
//setup google cloud
const uploadFileBucket = gc.bucket("upload-image-elearning");

@Resolver(_of => User)
export class UserResolver {

  //=======================FIELD RESOLVER=======================

  @FieldResolver(_return => [Course], { nullable: true})
  async coursesEnrolledByUser(
    @Root() root: User,
    @Ctx() { dataLoaders: { courseLoader } }: Context
  ){
    try {
      return await courseLoader.load(root.id);
    } catch (error) {
      return null
    }
  }


  //=============================QUERY==========================

  //Query for all users
  @Query((_return) => [User], { nullable: true })
  @UseMiddleware(checkAuth)
  async users(): Promise<User[] | null> {
    try {
      return await User.find();
    } catch (error) {
      return null;
    }
  }

  //Query for one user
  @Query((_return) => User, { nullable: true })
  async user(@Arg("id", (_type) => ID) id: number): Promise<User | undefined> {
    try {
      return await User.findOne(id);
    } catch (error) {
      return undefined;
    }
  }

  //Query me for get info
  @Query((_return) => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | undefined | null> {
    if (!req.session.userId) return null;

    const user = await User.findOne(req.session.userId);
    return user;
  }

  //=======================MUTATION=======================

  //Mutation for register

  @Mutation((_return) => UserMutationResponse)
  async register(
    @Arg("registerInput") registerInput: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    const validateRegisterInputError = validateRegisterInput(registerInput);

    if (validateRegisterInputError !== null)
      return { code: 400, success: false, ...validateRegisterInputError };

    try {
      const { username, email, password } = registerInput;
      const existingUser = await User.findOne({
        where: [{ username }, { email }], //where username == username or email == email
      });

      //check existing user
      if (existingUser)
        return {
          code: 400,
          success: false,
          message: "Duplicated username or email",
          errors: [
            {
              field: existingUser.username === username ? "username" : "email",
              message: `${
                existingUser.username === username ? "username" : "email"
              } has already taken`,
            },
          ],
        };

      //hash password
      const hashedPassword = await argon2.hash(password);

      //create new user
      const newUser = User.create({
        username,
        password: hashedPassword,
        email,
      });

      await newUser.save();

      req.session.userId = newUser.id;

      //All good
      return {
        code: 200,
        success: true,
        message: "Successfully register account",
        user: newUser,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  //Mutation for login

  @Mutation((_return) => UserMutationResponse)
  async login(
    @Arg("loginInput") loginInput: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    try {
      const { usernameOrEmail, password } = loginInput;
      const existingUser = await User.findOne(
        usernameOrEmail.includes("@")
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail }
      );

      if (!existingUser)
        return {
          code: 400,
          success: false,
          message: "Invalid username or password",
          errors: [
            {
              field: "usernameOrEmail",
              message: "Incorrect username or email",
            },
          ],
        };

      //Verify password input matches password of user or not
      const passwordValid = await argon2.verify(
        existingUser.password,
        password
      );

      if (!passwordValid)
        return {
          code: 400,
          success: false,
          message: "Invalid username or password",
          errors: [
            {
              field: "password",
              message: "Incorrect password",
            },
          ],
        };

      req.session.userId = existingUser.id;
      req.session.roleId = existingUser.roleId;
      console.log("UserID: ", req.session.userId);

      return {
        code: 200,
        success: true,
        message: "Login successfully",
        user: existingUser,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  //Mutation for logout

  @Mutation((_return) => Boolean)
  logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      res.clearCookie(COOKIE_NAME);
      req.session.destroy((error) => {
        if (error) {
          console.log("Destroying session error", error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  //Mutation for forgot password

  @Mutation((_return) => Boolean)
  async forgotPassword(
    @Arg("forgotPasswordInput") forgotPasswordInput: ForgotPasswordInput
  ): Promise<boolean> {
    const user = await User.findOne({ email: forgotPasswordInput.email });
    if (!user) return true;

    await TokenModel.findOneAndDelete({ userId: `${user.id}` });

    const resetToken = uuidv4();

    const hashedToken = await argon2.hash(resetToken);

    await new TokenModel({ userId: `${user.id}`, token: hashedToken }).save();

    await sendEmail(
      forgotPasswordInput.email,
      `<a href="http://localhost:3000/change-password?token=${resetToken}&userId=${user.id}">Click here to reset your password</a>`
    );
    return true;
  }

  //Mutation for change password

  @Mutation((_return) => UserMutationResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("userId") userId: string,
    @Arg("changePasswordInput") changePasswordInput: ChangePasswordInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    if (changePasswordInput.newPassword.length <= 5) {
      return {
        code: 400,
        success: false,
        message: "Invalid password",
        errors: [
          {
            field: "newPassword",
            message: "Length must be greater than 5",
          },
        ],
      };
    }

    try {
      const resetPasswordTokenRecord = await TokenModel.findOne({ userId });

      if (!resetPasswordTokenRecord) {
        return {
          code: 400,
          success: false,
          message: "Invalid or expired password reset token",
          errors: [
            {
              field: "token",
              message: "Invalid or expired password reset token",
            },
          ],
        };
      }

      const resetPasswordTokenValid = argon2.verify(
        resetPasswordTokenRecord.token,
        token
      );

      if (!resetPasswordTokenValid)
        return {
          code: 400,
          success: false,
          message: "Invalid or expired password reset token",
          errors: [
            {
              field: "token",
              message: "Invalid or expired password reset token",
            },
          ],
        };

      const userIdNum = parseInt(userId);

      const user = await User.findOne(userIdNum);

      if (!user)
        return {
          code: 400,
          success: false,
          message: "User no longer exists",
          errors: [{ field: "token", message: "User no longer exists" }],
        };

      const updatedPassword = await argon2.hash(
        changePasswordInput.newPassword
      );

      await User.update({ id: userIdNum }, { password: updatedPassword });

      await resetPasswordTokenRecord.deleteOne();

      req.session.userId = user.id;

      return {
        code: 200,
        success: true,
        message: "Successfully change password",
        user,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  //Mutation for update user

  @Mutation((_return) => UserMutationResponse)
  async updatedUser(
    @Arg("updateUserInput")
    { id, password, email, phoneNumber }: UpdateUserInput,
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ): Promise<UserMutationResponse> {
    let newImage = "";
    try {
      const existingUser = await User.findOne(id);

      if (!existingUser)
        return {
          code: 400,
          success: false,
          message: "User not found",
        };

      //hashed password
      const hashedPassword = await argon2.hash(password);

      new Promise((reject) =>
        createReadStream()
          .pipe(
            uploadFileBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: true,
            })
          )
          .on("error", reject)
          .on("finish", () =>
            uploadFileBucket
              .file(filename)
              .makePublic()
              .then((e) => {
                newImage = `https://storage.cloud.google.com/upload-image-elearning/${e[0].object}`;

                const existingImage = existingUser.profilePicture?.split("/").pop();

                if(newImage !== existingUser.profilePicture){
                  uploadFileBucket.file(existingImage as string).delete();
                  existingUser.profilePicture = newImage;
                }
                
                existingUser.profilePicture = newImage;
                existingUser.email = email;
                existingUser.password = hashedPassword;
                existingUser.phoneNumber = phoneNumber;
                existingUser.save();
              })

              .catch((error) => console.log(error.message))
          )
      );

      //All good
      return {
        code: 200,
        success: true,
        message: "Updated user successfully",
        user: existingUser,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
    // }
  }

  //Mutation for delete user
  @Mutation((_return) => UserMutationResponse)
  @UseMiddleware(checkAuth)
  async deleteUser(
    @Arg("id", (_type) => ID) id: number
  ): Promise<UserMutationResponse> {
    const existingUser = await User.findOne(id);

    if (!existingUser)
      return {
        code: 400,
        success: false,
        message: "User not found",
      };

    await User.delete({ id });

    const lastUrl = existingUser.profilePicture!.split("/");
    const filename = lastUrl[lastUrl.length - 1];
    await uploadFileBucket.file(filename).delete();

    return {
      code: 200,
      success: true,
      message: "Deleted user successfully",
    };
  }
}
