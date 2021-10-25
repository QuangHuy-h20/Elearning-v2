import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@ObjectType()
@Entity()
export class Enroll extends BaseEntity {


  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  courseId!: number;

  @ManyToOne((_to) => Course, (course) => course.enrolls)
  @JoinColumn({name: "courseId"})
  course!: Promise<Course>

  @ManyToOne((_to) => User, (user) => user.enrolls)
  @JoinColumn({name: "userId"})
  user!: Promise<User>

  @Field()
  @Column({ default: 0 })
  active: number;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
