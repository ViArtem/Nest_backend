import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GetUserIdFromJwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.refresh;

    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token);
        req.body = { ...req.body, userId: decodedToken.id };
      } catch (error) {
        console.log(error);
      }
    }

    next();
  }
}
