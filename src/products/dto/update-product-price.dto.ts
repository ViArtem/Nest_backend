import { IsNumber, IsString } from "class-validator";
export class UpdateProductImageDto {
  @IsString({ message: "Value must be a string" })
  readonly id: string;

  @IsNumber({}, { message: "Value must be a number" })
  readonly price: number;

  @IsNumber({}, { message: "Value must be a number" })
  readonly purchasePrice: number;

  @IsString({ message: "Value must be a string" })
  readonly userId: string;
}
