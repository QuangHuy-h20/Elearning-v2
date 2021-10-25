import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CourseCategory } from "./CourseCategory";
import { Enroll } from "./Enroll";
import { User } from "./User";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  courseName!: string;

  @Field()
  @Column()
  courseCode!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  userId!: number;

  @Field((_type) => User)
  @ManyToOne(() => User, (user) => user.courses)
  user: User;

  @OneToMany(() => Enroll, enroll => enroll.course)
  enrolls: Promise<Enroll[]>

  @Field()
  enrollStatus!: number
  
  @Field()
  @Column()
  categoryId!: string;

  @Field((_type) => CourseCategory)
  @ManyToOne(() => CourseCategory, (category) => category.courses)
  category: CourseCategory;

  @Field()
  @Column({ default: 0 })
  view: number;

  @Field()
	@Column({ default: 0 })
	numberOfStudent!: number

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
