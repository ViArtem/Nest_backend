import { Module } from "@nestjs/common";
import { RefreshService } from "./refresh.service";
import { Refresh } from "./refresh.model";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/users.model";

@Module({
  providers: [
    RefreshService,
    {
      provide: "REFRESH_REPOSITORY",
      useValue: Refresh,
    },
  ],
  imports: [
    SequelizeModule.forFeature([Refresh, User]),
    JwtModule.register({
      secret: process.env.REFRESH_KEY || "SeCrET",
      signOptions: {
        expiresIn: "30s",
      },
    }),
  ],
  exports: [RefreshService],
})
export class RefreshModule {}
