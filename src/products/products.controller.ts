import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { GetAllCategoryProductDto } from "./dto/get-all-category-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateProductImageDto } from "./dto/update-product-image.dto";
import { UpdateProductDto } from "./dto/udate-product.dto";

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("image"))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
    @UploadedFile() image
  ) {
    createProductDto.userId = req.cookies.refresh;
    return this.productService.create(createProductDto, image);
  }

  //
  @Post("get/all")
  getAllProduct(@Body() getAllCategoryProductDto: GetAllCategoryProductDto) {
    return this.productService.getAllByCategory(getAllCategoryProductDto);
  }

  //
  @Delete("delete")
  deleteProduct(@Body() deleteProductDto: DeleteProductDto) {
    return this.productService.delete(deleteProductDto);
  }

  //
  @Put("update")
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto);
  }

  //
  @Patch("update/image")
  @UseInterceptors(FileInterceptor("image"))
  updateProductImage(
    @Body() updateProductImageDto: UpdateProductImageDto,
    @UploadedFile() image
  ) {
    return this.productService.updateImage(updateProductImageDto, image);
  }

  //
  @Patch("update/price")
  updateProductPrice(@Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productService.updatePrice(updateProductImageDto);
  }

  @Post("count")
  getCategoryCount(@Body() userData: object) {
    return this.productService.count(userData);
  }
}
