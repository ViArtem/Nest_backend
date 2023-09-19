import {
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
export class CreateOrderDto {
  @IsString({ message: "Value must be a string" })
  @IsOptional()
  readonly id?: string;

  @IsString({ message: "Value must be a string" })
  @IsOptional()
  userId: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  @IsOptional()
  readonly customerId?: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  @IsOptional()
  readonly customerFirstName?: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  @IsOptional()
  readonly customerLastName?: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  @IsOptional()
  readonly customerAddresses?: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  @IsOptional()
  readonly customerContacts?: string;

  @IsArray({ message: "Value products must be a string" })
  @IsDefined({ message: "Value products must be defined" })
  readonly products: Array<object>;
}
