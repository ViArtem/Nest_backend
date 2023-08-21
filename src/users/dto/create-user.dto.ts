import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "Value must be a string" })
  readonly id: string;

  @IsEmail({}, { message: "Incorrect email" })
  @IsString({ message: "Value must be a string" })
  readonly email: string;

  @IsString({ message: "Value must be a string" })
  readonly firstName: string;

  @IsString({ message: "Value must be a string" })
  readonly lastName: string;

  @Length(6, 20, { message: "Min length 6, max - 20" })
  @IsString({ message: "Value must be a string" })
  readonly password: string;
}
