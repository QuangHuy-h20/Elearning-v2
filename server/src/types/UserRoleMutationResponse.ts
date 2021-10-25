import { UserRole } from "../entites/UserRole";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({ implements: IMutationResponse })
export class UserRoleMutationResponse implements IMutationResponse{
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field({ nullable: true })
  role?: UserRole;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
