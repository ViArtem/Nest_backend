import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Categories } from "src/categories/categories.model";
import { Products } from "./product.model";
import { User } from "src/users/users.model";

import { FilesService } from "src/files/files.service";

@Module({
  providers: [
    ProductsService,
    {
      provide: "PRODUCTS_REPOSITORY",
      useValue: Products,
    },
    FilesService,
  ],
  controllers: [ProductsController],
  imports: [SequelizeModule.forFeature([Products, Categories, User])],
})
export class ProductsModule {}
