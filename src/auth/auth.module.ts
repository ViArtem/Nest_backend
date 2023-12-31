import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { RefreshModule } from "src/refresh/refresh.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.ACCESS_KEY || "SeCrET",
      signOptions: {
        expiresIn: "15m",
      },
    }),
    forwardRef(() => RefreshModule),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
