import { IsNotEmpty, IsString } from 'class-validator';

export class NewPostDto {
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  @IsString()
  picture: string;
}
