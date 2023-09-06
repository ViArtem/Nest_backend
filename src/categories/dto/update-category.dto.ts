import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class UpdateCategoryDto {
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value id must not consist of only spaces",
  })
  @IsDefined({ message: "Value id must be defined" })
  readonly id: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value userId must not consist of only spaces",
  })
  @IsDefined({ message: "Value userId must be defined" })
  @IsOptional()
  readonly userId: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  readonly name: string;

  @IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value markup must be defined" })
  readonly markup: number;
}
