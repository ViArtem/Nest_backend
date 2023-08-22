import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "src/users/users.model";
import { Categories } from "./categories.model";

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: "CATEGORIES_REPOSITORY",
      useValue: Categories,
    },
  ],
  imports: [SequelizeModule.forFeature([User, Categories])],
})
export class CategoriesModule {}
