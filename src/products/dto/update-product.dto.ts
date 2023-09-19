import { IsDefined, IsNumber, IsString, Matches } from "class-validator";
export class UpdateProductDto {
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value id must not consist of only spaces",
  })
  @IsDefined({ message: "Value id must be defined" })
  readonly id: string;

  //
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
  readonly description: string;

  //

  @IsDefined({ message: "Value price must be defined" })
  readonly price: number | string;

  //

  @IsDefined({ message: "Value purchasePrice must be defined" })
  readonly purchasePrice: number | string;

  //

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
  readonly userId: string;
}
