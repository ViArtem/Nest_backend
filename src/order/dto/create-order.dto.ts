import { IsString } from 'class-validator';
import { ProductOnOrder } from '../productOnOrder.model';

export class CreateOrderDto {
  @IsString()
  readonly user_id: string;

  @IsString({ message: 'Value must be a string' })
  readonly client: string;

  @IsString({ message: 'Value must be a string' })
  readonly addresses: string;

  @IsString({ message: 'Value must be a string' })
  readonly clientNumber: string;

  readonly products: ProductOnOrder[];
}
