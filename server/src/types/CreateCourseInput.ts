import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCourseInput{

    @Field()
    courseName: string
    
    @Field()
    courseCode: string
   
    @Field()
    description: string

    @Field()
    categoryId: string

}

