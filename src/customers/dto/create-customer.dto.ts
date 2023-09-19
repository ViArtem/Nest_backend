import {
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
export class CreateCustomerDto {
  @IsString({ message: "Value must be a string" })
  @IsOptional()
  readonly id?: string;

  @IsString({ message: "Value firstName must be a string" })
  @IsOptional()
  firstName: string;

  @IsString({ message: "Value lastName must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value lastName must not consist of only spaces",
  })
  @IsDefined({ message: "Value lastName must be defined" })
  @IsOptional()
  lastName: string;

  @IsString({ message: "Value addresses must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value addresses must not consist of only spaces",
  })
  @IsDefined({ message: "Value addresses must be defined" })
  addresses: string;

  @IsString({ message: "Value contacts must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value contacts must not consist of only spaces",
  })
  @IsDefined({ message: "Value contacts must be defined" })
  contacts: string;

  @IsBoolean({ message: "Value contacts must be a string" })
  @IsDefined({ message: "Value contacts must be defined" })
  @IsOptional()
  getCustomerData?: boolean;

  @IsString({ message: "Value userId must be a string" })
  @IsDefined({ message: "Value userId must be defined" })
  userId: string;
}
