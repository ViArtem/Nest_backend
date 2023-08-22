import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { GetAllCategoryProductDto } from "./dto/get-all-category-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("image"))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image
  ) {
    return this.productService.create(createProductDto, image);
  }

  @Post("get/all")
  getAllProduct(@Body() getAllCategoryProductDto: GetAllCategoryProductDto) {
    return this.productService.getAllByCategory(getAllCategoryProductDto);
  }

  @Delete("delete")
  deleteProduct(@Body() deleteProductDto: DeleteProductDto) {
    return this.productService.delete(deleteProductDto);
  }

  @Put("update")
  updateProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.update(createProductDto);
  }

  @Patch("update/price")
  updateProductPrice(@Body() createProductDto: CreateProductDto) {
    return this.productService;
  }
}
