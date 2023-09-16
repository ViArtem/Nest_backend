import { IsDefined, IsOptional, IsString, Matches } from "class-validator";

export class UpdateImageDto {
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
  userId: string;
}
