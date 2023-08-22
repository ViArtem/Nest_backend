import { IsString } from "class-validator";
export class GetAllCategoryProductDto {
  @IsString({ message: "Value must be a string" })
  readonly categoryId: string;

  @IsString({ message: "Value must be a string" })
  readonly userId: string;
}
