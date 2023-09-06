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
import { RefreshService } from "src/refresh/refresh.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private refreshService: RefreshService
  ) {}

  async auth(
    userDto: LogInUserDto
  ): Promise<{ access: string; refresh: string }> {
    try {
      const user = await this.userValidate(userDto);

      const access = await this.generateAccessToken(user);
      const refresh = await this.refreshService.generateRefresh(user);

      await this.refreshService.updateRefreshInDatabase({
        id: "1",
        userId: user.id,
        refresh: refresh,
      });

      return { access: access.token, refresh };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async registration(
    userDto: CreateUserDto
  ): Promise<{ access: string; refresh: string }> {
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

      const access = await this.generateAccessToken(user);
      const refresh = this.refreshService.generateRefresh(user);

      await this.refreshService.saveRefreshToDatabase({
        id: "1",
        refresh,
        userId: user.id,
      });

      return { access: access.token, refresh };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async logOut(userId: string) {
    try {
      await this.refreshService.saveRefreshToDatabase({
        id: "1",
        refresh: "user log out",
        userId,
      });

      return { success: "User is successfully logged out" };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //TODO: винести в окремий модуль
  private async generateAccessToken(user: User) {
    try {
      const payload = {
        id: user.id,
        userName: `${user.firstName}  ${user.lastName}`,
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

  async updateTokens(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException({
          message: "Refresh token is undefined",
        });
      }

      const tokenData = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_KEY,
      });

      const user = await this.userService.getUserById(tokenData.id);

      // TODO: переробити з врахуванням що user.refresh буде масивом

      if (user.refresh.dataValues.refresh !== refreshToken) {
        throw new UnauthorizedException({
          message: "Refresh token is not valid",
        });
      }

      const access = await this.generateAccessToken(user);
      const refresh = this.refreshService.generateRefresh(user);

      await this.refreshService.saveRefreshToDatabase({
        id: "1",
        refresh,
        userId: user.id,
      });

      return { access: access.token, refresh };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException({
          message: error.message,
        });
      }
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
