import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsString({ message: "Value must be a string" })
  @IsOptional()
  readonly id?: string;

  @IsString({ message: "Value must be a string" })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString({ message: "Value must be a string" })
  @IsNotEmpty({ message: "Value first name can not be empty" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value first name must not consist of only spaces",
  })
  readonly firstName: string;

  @IsString({ message: "Value must be a string" })
  @IsNotEmpty({ message: "Value last name can not be empty" })
  @Matches(/^(?!\s*$).+/, {
    message: "Value last name must not consist of only spaces",
  })
  readonly lastName: string;

  @IsString({ message: "Value must be a string" })
  @Length(6, 21, { message: "Min length 6, max - 21" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])[a-zA-Z\d!@#$%^&*()_+{}[\]:;<>,.?~\\-]{6,}$/,
    {
      message:
        "The password must have a minimum of six characters, at least one uppercase letter, one lowercase letter, and one number and one special character.",
    }
  )
  readonly password: string;
}
