import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserRole extends BaseEntity {
  @Field((_type) => String)
  @PrimaryColumn({ unique: true })
  id!: string;

  @Field()
  @Column({ unique: true })
  roleName!: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
