import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ReactionDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  entityId: number;
  @IsNotEmpty()
  @IsString()
  reactionType: string;
}
