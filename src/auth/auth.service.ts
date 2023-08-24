import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from "@nestjs/common";
import { LogInUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt/dist";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async auth(userDto: LogInUserDto) {
    const user = await this.userValidate(userDto);

    return this.generateTokens(user);
  }

  //
  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.getUserByEmail(userDto.email);

      if (candidate) {
        throw new HttpException(
          "User whith this email already exist",
          HttpStatus.BAD_REQUEST
        );
      }

      const hashPassword = await bcrypt.hash(userDto.password, 5);

      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });

      return this.generateTokens(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  private async generateTokens(user: User) {
    try {
      const payload = {
        id: user.id,
        role: user.roles,
      };

      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  private async userValidate(userDto: LogInUserDto) {
    try {
      const user = await this.userService.getUserByEmail(userDto.email);

      if (!user) {
        throw new UnauthorizedException("Email or password incorrect");
      }
      const passwordCompare = await bcrypt.compare(
        userDto.password,
        user.password
      );

      if (user && passwordCompare) {
        return user;
      }

      throw new UnauthorizedException("Email or password incorrect");
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
