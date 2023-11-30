import { IsDefined, IsString, IsEmpty, IsNumber } from "class-validator";

export class CreateCommentValid {
  @IsDefined() @IsNumber()
  bookId: number;

  @IsEmpty() @IsString() 
  comment: string;
}