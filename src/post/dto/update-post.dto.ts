import { isNotEmpty, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  postToUpdateId: number;
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  @IsString()
  picture: string;
}
