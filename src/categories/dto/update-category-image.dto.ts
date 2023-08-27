import { IsString } from "class-validator";

export class UpdateImageDto {
  @IsString({ message: "Value must be a string" })
  readonly id: string;

  @IsString({ message: "Value must be a string" })
  readonly userId: string;

  @IsString({ message: "Value must be a string" })
  readonly img: string;
}
