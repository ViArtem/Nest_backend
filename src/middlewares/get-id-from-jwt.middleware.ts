import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";

import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GetUserIdFromJwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refresh;

      if (token) {
        try {
          const decodedToken = await this.jwtService.verify(token, {
            secret: process.env.REFRESH_KEY,
          });

          req.body = { ...req.body, userId: decodedToken.id };
        } catch (error) {
          console.log(error);
          throw new UnauthorizedException(error.message);
        }
      } else {
        throw new UnauthorizedException("Refresh token undefined");
      }

      next();
    } catch (error) {
      console.log(error);
      next();
      throw new UnauthorizedException(error.message);
    }
  }
}
