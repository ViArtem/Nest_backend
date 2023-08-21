import { IsString } from "class-validator";
export class DeleteCategoryDto {
  @IsString({ message: "Value must be a string" })
  readonly userId: string;

  @IsString({ message: "Value must be a string" })
  readonly name: string;
}
