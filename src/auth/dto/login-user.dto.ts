import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LogInUserDto {
  @IsString({ message: "Value must be a string" })
  @IsNotEmpty()
  @IsEmail(undefined, {
    message: "must be a valid email address",
  })
  readonly email: string;

  @IsString({ message: "Value must be a string" })
  @IsNotEmpty()
  @Length(1, 21, {
    message: "Password length must be between 1 and 21 characters",
  })
  readonly password: string;
}
