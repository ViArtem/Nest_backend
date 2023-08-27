import { IsNumber, IsString } from "class-validator";
export class CreateProductDto {
  @IsString({ message: "Value must be a string" })
  readonly name: string;

  @IsString({ message: "Value must be a string" })
  readonly description: string;

  @IsString({ message: "Value must be a string" })
  readonly img: string;

  @IsNumber({}, { message: "Value must be a number" })
  price: number;

  @IsNumber({}, { message: "Value must be a number" })
  readonly purchasePrice: number;

  @IsNumber({}, { message: "Value must be a number" })
  readonly quantity: number;

  @IsString({ message: "Value must be a string" })
  readonly categoryId: string;

  @IsString({ message: "Value must be a string" })
  readonly userId: string;
}
