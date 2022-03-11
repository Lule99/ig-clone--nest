import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  postToUpdateId: number;
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  picture: string;
}
