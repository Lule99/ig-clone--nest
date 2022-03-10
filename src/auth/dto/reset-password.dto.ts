import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  repeatedPassword: string;
}
