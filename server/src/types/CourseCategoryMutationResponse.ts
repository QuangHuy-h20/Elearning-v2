import { CourseCategory } from "../entites/CourseCategory";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({ implements: IMutationResponse })
export class CourseCategoryMutationResponse implements IMutationResponse{
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field({ nullable: true })
  category?: CourseCategory;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
