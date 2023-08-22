import { IsNumber, IsString } from "class-validator";
export class DeleteProductDto {
  @IsString({ message: "Value must be a string" })
  readonly id: string;

  @IsString({ message: "Value must be a string" })
  readonly name: string;

  @IsString({ message: "Value must be a string" })
  readonly categoryId: string;
}
