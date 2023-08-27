import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { User } from "src/users/users.model";
import { UserStatistics } from "./statistics.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [StatisticsService],
  imports: [SequelizeModule.forFeature([User, UserStatistics])],
})
export class StatisticsModule {}
