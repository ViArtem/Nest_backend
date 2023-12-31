import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "src/users/users.model";
import { Categories } from "./categories.model";

import { FilesModule } from "src/files/files.module";
import { RefreshModule } from "src/refresh/refresh.module";

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: "CATEGORIES_REPOSITORY",
      useValue: Categories,
    },
  ],
  imports: [
    SequelizeModule.forFeature([User, Categories]),
    FilesModule,
    RefreshModule,
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
