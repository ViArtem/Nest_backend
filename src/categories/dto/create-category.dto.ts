import { IsNumber, IsString } from "class-validator";
export class CreateCategoryDto {
  @IsString({ message: "Value must be a string" })
  readonly id: string;

  @IsString({ message: "Value must be a string" })
  readonly userId: string;

  @IsString({ message: "Value must be a string" })
  readonly name: string;

  @IsNumber({}, { message: "Value must be a number" })
  readonly markup: number;
}
