import { Course } from "../entites/Course";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedCourses {
  @Field()
  totalCount!: number;

  @Field((_type) => Date)
  cursor!: Date;

  @Field()
  hasMore!: boolean;

  @Field((_type) => [Course])
  paginatedCourses!: Course[];
}
