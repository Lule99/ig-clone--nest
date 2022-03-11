import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class NewCommentDto {
  @IsPositive()
  @IsNumber()
  commentedEntityId: number;
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNumber()
  @IsPositive()
  postId: number;
}
