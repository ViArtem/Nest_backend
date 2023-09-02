import { IsDefined, IsOptional, IsString, Matches } from "class-validator";
export class DeleteCategoryDto {
  @IsString({ message: "Value must be a string" })
  readonly id: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value img must not consist of only spaces",
  })
  @IsOptional()
  readonly userId: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value img must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  readonly name: string;
}
