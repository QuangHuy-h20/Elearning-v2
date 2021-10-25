import { Course } from "../entites/Course";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({ implements: IMutationResponse })
export class CourseMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field({ nullable: true })
  course?: Course;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
