
import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Course } from "./Course";
import { Enroll } from "./Enroll";
import { UserRole } from "./UserRole";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ default: "student" })
  roleId!: string;

  @Field((_type) => UserRole)
  @ManyToOne(() => UserRole, (role) => role.users)
  role: UserRole;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => Enroll, (enroll) => enroll.user)
  enrolls: Promise<Enroll[]>;

  @Field()
  @Column({ nullable: true, default: "" })
  phoneNumber?: string;

  @Field()
  @Column({ nullable: true, default: "" })
  profilePicture?: string;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

}
