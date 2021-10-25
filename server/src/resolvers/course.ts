import { UserInputError } from "apollo-server-errors";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection, LessThan } from "typeorm";
import { Course } from "../entites/Course";
import { CourseCategory } from "../entites/CourseCategory";
import { Enroll } from "../entites/Enroll";
import { User } from "../entites/User";
import { checkAuth } from "../middleware/checkAuth";
import { gc } from "../services/googleCloud";
import { Context } from "../types/Context";
import { CourseMutationResponse } from "../types/CourseMutationResponse";
import { CreateCourseInput } from "../types/CreateCourseInput";
import { EnrollStatus } from "../types/EnrollStatus";
import { PaginatedCourses } from "../types/PaginatedCourses";
import { SearchInput } from "../types/SearchInput";
import { UpdateCourseInput } from "../types/UpdateCourseInput";

registerEnumType(EnrollStatus, {
  name: "EnrollStatus", // this one is mandatory
});

//setup google cloud
const uploadFileBucket = gc.bucket("upload-image-elearning");

// gc.getBuckets().then((x) => console.log(x));

@Resolver((_of) => Course)
export class CourseResolver {

  //=======================FIELD RESOLVER=======================
  @FieldResolver((_return) => String)
  textSnippet(@Root() root: Course) {
    return root.description.slice(0, 160);
  }

  @FieldResolver((_return) => User)
  async user(
    @Root() root: Course,
    @Ctx() { dataLoaders: { userLoader } }: Context
  ) {
    // return await User.findOne(root.userId);
    return await userLoader.load(root.userId);
  }

  @FieldResolver((_return) => CourseCategory)
  async category(@Root() root: CourseCategory) {
    return await CourseCategory.findOne(root.categoryName);
  }

  @FieldResolver((_return) => Int)
  async enrollStatus(
    @Root() root: Course,
    @Ctx() { req, dataLoaders: { enrollLoader } }: Context
  ) {
    if (!req.session.userId) return 0;
    // const existingEnroll = await Enroll.findOne({
    //   courseId: root.id,
    //   userId: req.session.userId,
    // });
    const existingEnroll = await enrollLoader.load({
      courseId: root.id,
      userId: req.session.userId,
    });
    return existingEnroll ? existingEnroll.active : 0;
  }

  //=======================QUERY=======================

  //Query for get all course
  @Query((_return) => PaginatedCourses, { nullable: true })
  async courses(
    @Arg("limit", (_type) => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string
  ): Promise<PaginatedCourses | null> {
    try {
      const totalCourseCount = await Course.count();
      const realLimit = Math.min(10, limit);

      // Course.find({
      //   where:{
      //     createdAt: LessThan(cursor)
      //   },
      //   order:{
      //     createdAt:"DESC"
      //   },
      //   take: realLimit
      // })

      const findOptions: { [key: string]: any } = {
        order: {
          createdAt: "DESC",
        },
        take: realLimit,
      };

      let lastCourse: Course[] = [];

      if (cursor) {
        findOptions.where = { createdAt: LessThan(cursor) };
        lastCourse = await Course.find({
          order: {
            createdAt: "ASC",
          },
          take: 1,
        });
      }

      const courses = await Course.find(findOptions);

      return {
        totalCount: totalCourseCount,
        cursor: courses[courses.length - 1].createdAt,
        hasMore: cursor
          ? courses[courses.length - 1].createdAt.toString() !==
            lastCourse[0].createdAt.toString()
          : courses.length !== totalCourseCount,
        paginatedCourses: courses,
      };
    } catch (error) {
      return null;
    }
  }

  //Query for get courses by category
  @Query((_return) => [Course], { nullable: true })
  async coursesByCategory(
    @Arg("categoryId", (_type) => String) categoryId: string
  ): Promise<Course[] | null> {
    try {
      return await Course.find({ categoryId });
    } catch (error) {
      return null;
    }
  }

  //Query for one course
  @Query((_return) => Course, { nullable: true })
  async course(
    @Arg("id", (_type) => ID) id: number
  ): Promise<Course | undefined> {
    try {
      const course = await Course.findOne(id);
      return course;
    } catch (error) {
      return undefined;
    }
  }

  //Query for search
  @Query((_return) => [Course!], { nullable: true })
  async searchListings(
    @Arg("searchInput") { courseName, courseCode }: SearchInput
  ): Promise<Course[]> {
    let listingQB = getConnection()
      .getRepository(Course)
      .createQueryBuilder("l");
    if (courseName) {
      listingQB.andWhere("l.courseName ilike :courseName", {
        courseName: `%${courseName}%`,
      });
    }
    if (courseCode) {
      listingQB.andWhere("l.courseCode ilike :courseCode", {
        courseCode: `%${courseCode}%`,
      });
    }
    return listingQB.getMany();
  }

  //=======================MUTATION=======================

  //Mutation for create course
  @Mutation((_return) => CourseMutationResponse)
  @UseMiddleware(checkAuth)
  async createCourse(
    @Arg("createCourseInput") createCourseInput: CreateCourseInput,
    @Ctx() { req }: Context,
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ): Promise<CourseMutationResponse> {
    let imgURL = "";
    try {
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
                imgURL = `https://storage.cloud.google.com/upload-image-elearning/${e[0].object}`;
                Course.create({
                  ...createCourseInput,
                  image: imgURL,
                  userId: req.session.userId,
                }).save();
              })
              .catch((error) => console.log(error.message))
          )
      );

      return {
        code: 200,
        success: true,
        message: "Course created successfully",
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  //Mutation for update course
  @Mutation((_return) => CourseMutationResponse)
  @UseMiddleware(checkAuth)
  async updateCourse(
    @Arg("updateCourseInput")
    { id, courseName, courseCode, description, categoryId }: UpdateCourseInput,
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Ctx() { req }: Context
  ): Promise<CourseMutationResponse> {
    let newImage = "";
    try {
      const existingCourse = await Course.findOne(id);
      if (!existingCourse)
        return {
          code: 400,
          success: false,
          message: "Course not found",
        };

      if (existingCourse.userId !== req.session.userId)
        return { code: 401, success: false, message: "Unauthorized" };

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

                const existingImage = existingCourse.image?.split("/").pop();

                if (newImage !== existingCourse.image) {
                  uploadFileBucket.file(existingImage as string).delete();
                }

                existingCourse.courseName = courseName;
                existingCourse.courseCode = courseCode;
                existingCourse.description = description;
                existingCourse.categoryId = categoryId;
                existingCourse.image = newImage;
                existingCourse.save();
              })
              .catch((error) => console.log(error.message))
          )
      );

      return {
        code: 200,
        success: true,
        message: "Updated course successfully",
        course: existingCourse,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  //Mutation for delete course
  @Mutation((_return) => CourseMutationResponse)
  @UseMiddleware(checkAuth)
  async deleteCourse(
    @Arg("id", (_type) => ID) id: number,
    @Ctx() { req }: Context
  ): Promise<CourseMutationResponse> {
    const existingCourse = await Course.findOne(id);
    if (!existingCourse)
      return {
        code: 400,
        success: false,
        message: "Course not found",
      };

    if (existingCourse.userId !== req.session.userId)
      return { code: 401, success: false, message: "Unauthorized" };

    await Course.delete({ id });

    const lastUrl = existingCourse.image.split("/");
    const filename = lastUrl[lastUrl.length - 1];
    await uploadFileBucket.file(filename).delete();

    return {
      code: 200,
      success: true,
      message: "Deleted course successfully",
    };
  }

  @Mutation((_return) => CourseMutationResponse)
  async enroll(
    @Arg("courseId", (_type) => Int) courseId: number,
    @Arg("enrollStatusValue", (_type) => EnrollStatus)
    enrollStatusValue: EnrollStatus,
    @Ctx()
    {
      req: {
        session: { userId },
      },
      connection,
    }: Context
  ): Promise<CourseMutationResponse> {
    return await connection.transaction(async (transactionEntityManager) => {
      //check if course exists
      let course = await transactionEntityManager.findOne(Course, courseId);

      if (!course) {
        throw new UserInputError("Course not found");
      }
      //check if user has enrolled or not
      const existingEnroll = await transactionEntityManager.findOne(Enroll, {
        courseId,
        userId,
      });

      if (existingEnroll && existingEnroll.active !== enrollStatusValue) {
        await transactionEntityManager.delete(Enroll, {active: EnrollStatus.enroll});

        course = await transactionEntityManager.save(Course, {
          ...course,
          numberOfStudent: course.numberOfStudent + enrollStatusValue,
        });
      }

      if (!existingEnroll) {
        const newEnroll = transactionEntityManager.create(Enroll, {
          userId,
          courseId,
          active: enrollStatusValue,
        });
        await transactionEntityManager.save(newEnroll);

        course.numberOfStudent += enrollStatusValue;

        course = await transactionEntityManager.save(course);
      }

      return {
        code: 200,
        success: true,
        message:
          enrollStatusValue === 1
            ? "Enrolled course successfully"
            : "Unenroll course successfully",
        course,
      };
    });
  }
}
