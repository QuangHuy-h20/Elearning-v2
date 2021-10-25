import { Field, ID, InputType } from "type-graphql";

@InputType()

export class UpdateCourseInput{
    
    @Field(_type => ID)
    id:number
    
    @Field()
    courseName:string
    
    @Field()
    courseCode:string
    
    @Field()
    description:string
    
    @Field()
    categoryId: string

}