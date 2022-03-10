import { IsNotEmpty, IsString } from 'class-validator';

export class NewPostDto {
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  picture: string;
}
