import { Inject, Injectable } from "@nestjs/common";
import { Products } from "./product.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetAllCategoryProductDto } from "./dto/get-all-category-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { FilesService } from "src/files/files.service";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCTS_REPOSITORY")
    private productsRepository: typeof Products,
    private fileServise: FilesService
  ) {}

  async create(
    createProductDto: CreateProductDto,
    image: any
  ): Promise<object> {
    try {
      const img = await this.fileServise.saveImage(image);

      const product = await this.productsRepository.create({
        ...createProductDto,
        img,
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async getAllByCategory(getAllCategoryProductDto: GetAllCategoryProductDto) {
    try {
      const products = await this.productsRepository.findAll({
        where: {
          categoryId: getAllCategoryProductDto.categoryId,
          userId: getAllCategoryProductDto.userId,
        },
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async delete(deleteProductDto: DeleteProductDto) {
    try {
    } catch (error) {}
  }

  //
  async update(updateProductDto: DeleteProductDto) {
    try {
    } catch (error) {}
  }
}
