import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Course } from "./Course";

@ObjectType()
@Entity()
export class CourseCategory extends BaseEntity {
  
  @Field((_type) => String)
  @PrimaryColumn({ unique: true })
  id!: string;

  @Field()
  @Column({ unique: true })
  categoryName!: string;

  @OneToMany(() => Course, (course) => course.category)
  courses: Course[];
}
