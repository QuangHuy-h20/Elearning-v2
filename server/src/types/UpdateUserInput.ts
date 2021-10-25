import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  
  @Field((_type) => ID)
  id: number;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
  
}
