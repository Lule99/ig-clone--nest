import { IsBase64, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    username : string
    
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    repeatedPassword: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    bio: string

    @IsNotEmpty()
    //@IsBase64()
    profilePicture: string


}