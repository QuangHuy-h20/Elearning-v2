import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCourseCategoryInput{
    
    @Field()
    id: string
    
    @Field()
    categoryName: string

}