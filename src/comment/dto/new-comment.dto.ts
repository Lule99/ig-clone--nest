import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class NewCommentDto {

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    commentedEntityId : number;
    @IsNotEmpty()
    @IsString()
    text : string;
}