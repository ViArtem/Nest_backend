import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateProductOnOrderDto {
  @IsString()
  readonly order_id: string;

  @IsString({ message: 'Value must be a string' })
  readonly productName: string;

  @IsNumber()
  readonly quantity: number;

  @IsNumber()
  readonly price: number;
}
