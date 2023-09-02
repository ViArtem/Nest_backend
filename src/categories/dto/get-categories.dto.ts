import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class GetCategoriesDto {
  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value img must not consist of only spaces",
  })
  @IsDefined({ message: "Value img must be defined" })
  @IsOptional()
  readonly userId: string;

  @IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value page must be defined" })
  readonly page: number;

  @IsNumber({}, { message: "Value must be a number" })
  @IsDefined({ message: "Value limit must be defined" })
  readonly limit: number;
}
