import { CourseCategory } from "../entites/CourseCategory";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CourseCategoryMutationResponse } from "../types/CourseCategoryMutationResponse";
import { CreateCourseCategoryInput } from "../types/CreateCourseCategoryInput";

@Resolver()
export class CourseCategoryResolver {
  //======================= QUERY =======================

  @Query((_return) => [CourseCategory], { nullable: true })
  async categories(): Promise<CourseCategory[] | null> {
    try {
      return await CourseCategory.find();
    } catch (error) {
      return null;
    }
  }

  //======================= MUTATION =======================
  @Mutation((_return) => CourseCategoryMutationResponse)
  async createCategory(
    @Arg("createCourseCategoryInput")
    createCourseCategoryInput: CreateCourseCategoryInput
  ): Promise<CourseCategoryMutationResponse> {
    try {
      const { id, categoryName } = createCourseCategoryInput;

      const existingCategory = await CourseCategory.findOne({
        where: [{ id }, { categoryName }],
      });

      if (existingCategory)
        return {
          code: 400,
          success: false,
          message: "Category has already exist",
          errors: [
            {
              field: existingCategory.id === id ? "id" : "categoryName",
              message: `${existingCategory.id === id ? "id" : "categoryName"} has already taken`,
            },
          ],
        };

      const newCategory = CourseCategory.create({ ...createCourseCategoryInput });

      newCategory.save();

      return {
        code: 200,
        success: true,
        message: "Course category created successfully",
        category: newCategory,
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
