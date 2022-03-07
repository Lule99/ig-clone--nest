import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    
    @IsNotEmpty()
    @IsString()
    username : string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    bio: string;
    @IsNotEmpty()
    @IsString()     //TODO ?
    picture: string;

}