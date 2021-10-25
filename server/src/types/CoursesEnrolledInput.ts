import { Field, InputType } from "type-graphql";

@InputType()
export class CoursesEnrolledInput {
  @Field()
  userId: number;

  @Field()
  active: number;
}
