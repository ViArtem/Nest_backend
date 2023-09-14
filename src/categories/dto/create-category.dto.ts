import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
export class CreateCategoryDto {
  @IsString({ message: "Value must be a string" })
  @IsOptional()
  readonly id?: string;

  @IsString({ message: "Value must be a string" })
  @IsOptional()
  userId: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value img must not consist of only spaces",
  })
  @IsDefined({ message: "Value img must be defined" })
  @IsOptional()
  readonly img: string;

  @IsString({ message: "Value must be a string" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value name must not consist of only spaces",
  })
  @IsDefined({ message: "Value name must be defined" })
  readonly name: string;

  @IsString({ message: "Value must be a string" })
  @IsDefined({ message: "Value markup must be defined" })
  readonly markup: string;
}
