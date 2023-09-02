import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
export class UpdateProductImageDto {
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value id must not consist of only spaces",
  })
  @IsDefined({ message: "Value id must be defined" })
  readonly id: string;

  @IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value price must be defined" })
  readonly price: number;

  @IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value purchasePrice must be defined" })
  readonly purchasePrice: number;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value userId must not consist of only spaces",
  })
  @IsDefined({ message: "Value userId must be defined" })
  @IsOptional()
  readonly userId: string;
}
