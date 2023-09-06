import { IsDefined, IsString, Matches } from "class-validator";
export class GetAllCategoryProductDto {
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value categoryId must not consist of only spaces",
  })
  @IsDefined({ message: "Value categoryId must be defined" })
  readonly categoryId: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value userId must not consist of only spaces",
  })
  @IsDefined({ message: "Value userId must be defined" })
  readonly userId: string;
}
