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
  @IsOptional()
  readonly img: string;

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
