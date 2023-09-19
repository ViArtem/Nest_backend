import { Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from "class-validator";

class Product {
  @IsString({ message: "Value must be a string" })
  @IsDefined({ message: "productId must be defined" })
  productId: string;

  @IsDefined({ message: "count must be defined" })
  count: number;

  @IsDefined({ message: "specialPrice must be defined" })
  specialPrice: string;
}

export class CreateOrderDto {
  @IsString({ message: "Value must be a string" })
  @IsOptional()
  readonly id?: string;

  @IsString({ message: "Value userId must be a string" })
  @IsOptional()
  userId: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value customerId must not consist of only spaces",
  })
  @IsDefined({ message: "Value customerId must be defined" })
  @IsOptional()
  customerId?: string;

  @IsString({ message: "Value customerFirstName must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value customerFirstName must not consist of only spaces",
  })
  @IsDefined({ message: "Value customerFirstName must be defined" })
  @IsOptional()
  readonly customerFirstName?: string;

  @IsString({ message: "Value customerLastName must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value customerLastName must not consist of only spaces",
  })
  @IsDefined({ message: "Value customerLastName must be defined" })
  @IsOptional()
  readonly customerLastName?: string;

  @IsString({ message: "Value customerAddresses must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value customerAddresses must not consist of only spaces",
  })
  @IsDefined({ message: "Value customerAddresses must be defined" })
  @IsOptional()
  readonly customerAddresses?: string;

  @IsString({ message: "Value customerContacts must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value customerContacts must not consist of only spaces",
  })
  @IsDefined({ message: "Value customerContacts must be defined" })
  @IsOptional()
  readonly customerContacts?: string;

  @IsArray({ message: "Value products must be a string" })
  @IsDefined({ message: "Value products must be defined" })
  @ValidateNested({ each: true })
  @Type(() => Product)
  readonly products: Product[];
}
