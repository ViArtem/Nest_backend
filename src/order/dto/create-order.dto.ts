import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class ProductInfoDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly productName: string;

  @IsNumber()
  readonly quantity: number;

  @IsNumber()
  readonly price: number;
}

export class CreateCategoryDto {
  @IsNumber()
  readonly owner: number;

  @IsString({ message: "Value must be a string" })
  readonly client: string;

  @IsString({ message: "Value must be a string" })
  readonly addresses: string;

  @IsString({ message: "Value must be a string" })
  readonly clientNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  readonly productInfo: ProductInfoDto[];
}
