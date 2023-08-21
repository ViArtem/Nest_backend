import { IsNumber, IsString } from "class-validator";

export class GetCategoriesDto {
  @IsString({ message: "Value must be a string" })
  readonly userId: string;

  @IsNumber({}, { message: "Value must be a number" })
  readonly page: number;

  @IsNumber({}, { message: "Value must be a number" })
  readonly limit: number;
}
