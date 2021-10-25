import { UserRole } from "../entites/UserRole";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserRoleMutationResponse } from "../types/UserRoleMutationResponse";
import { CreateUserRoleInput } from "../types/CreateUserRoleInput";

@Resolver()
export class UserRoleResolver {
  //======================= QUERY =======================

  @Query((_return) => [UserRole], { nullable: true })
  async roles(): Promise<UserRole[] | null> {
    try {
      return await UserRole.find();
    } catch (error) {
      return null;
    }
  }

  //======================= MUTATION =======================
  @Mutation((_return) => UserRoleMutationResponse)
  async createRole(
    @Arg("createUserRoleInput") createUserRoleInput: CreateUserRoleInput
  ): Promise<UserRoleMutationResponse> {
    try {
      const { id, roleName } = createUserRoleInput;

      const existingRole = await UserRole.findOne({
        where: [{ id }, { roleName }],
      });

      if (existingRole)
        return {
          code: 400,
          success: false,
          message: "Role has already exist",
          errors: [
            {
              field: existingRole.id === id ? "id" : "roleName",
              message: `${existingRole.id === id ? "id" : "roleName"} has already taken`,
            },
          ],
        };

      const newRole = UserRole.create({ ...createUserRoleInput });

      newRole.save();

      return {
        code: 200,
        success: true,
        message: "Role created successfully",
        role: newRole,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }
}
