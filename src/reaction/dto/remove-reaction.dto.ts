import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class RemoveReactionDto {
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id: number;
    @IsNotEmpty()
    @IsString()
    entityId: number;
  }