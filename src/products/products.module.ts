import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Categories } from "src/categories/categories.model";
import { Products } from "./product.model";

@Module({
  providers: [
    ProductsService,
    {
      provide: "PRODUCTS_REPOSITORY",
      useValue: Products,
    },
  ],
  controllers: [ProductsController],
  imports: [SequelizeModule.forFeature([Products, Categories])],
})
export class ProductsModule {}
