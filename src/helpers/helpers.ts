import { JwtService } from "@nestjs/jwt";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class Helpers {
  constructor(private jwtService: JwtService) {}

  getUserIdFromToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.REFRESH_KEY,
      });

      const id = decodedToken.id;
      return id;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
