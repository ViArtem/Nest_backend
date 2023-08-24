import { IsString } from "class-validator";

export class UpdateProductImageDto {
  @IsString({ message: "Value must be a string" })
  readonly id: string;

  @IsString({ message: "Value must be a string" })
  readonly img: string;

  @IsString({ message: "Value must be a string" })
  readonly userId: string;
}
