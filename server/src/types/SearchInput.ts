import { Field, InputType } from "type-graphql";

@InputType()
export class SearchInput {

    @Field({ nullable: true})
    courseName?: string
    
    @Field({ nullable: true})
    courseCode?: string
    
}
