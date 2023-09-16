import { IsDefined, IsOptional, IsString, Matches } from "class-validator";
export class CreateProductDto {
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  readonly name: string;

  //
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value description must not consist of only spaces",
  })
  @IsDefined({ message: "Value description must be defined" })
  @IsOptional()
  readonly description: string;

  //
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value img must not consist of only spaces",
  })
  @IsDefined({ message: "Value img must be defined" })
  @IsOptional()
  readonly img: string;

  //
  //@IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value price must be defined" })
  price: number | string;

  //
  // @IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value purchasePrice must be defined" })
  readonly purchasePrice: number | string;

  //
  //@IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value quantity must be defined" })
  readonly quantity: number | string;

  //
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value categoryId must not consist of only spaces",
  })
  @IsDefined({ message: "Value categoryId must be defined" })
  readonly categoryId: string;

  //
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value userId must not consist of only spaces",
  })
  @IsDefined({ message: "Value userId must be defined" })
  @IsOptional()
  userId: string;
}
