import {
  Inject,
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
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
      const checkProduct = await this.productsRepository.findOne({
        where: { name: createProductDto.name, userId: createProductDto.userId },
      });

      if (checkProduct) {
        throw new BadRequestException("This product already exists");
      }

      const img = await this.fileServise.saveFile(image);

      const product = await this.productsRepository.create({
        ...createProductDto,
        img,
      });

      return product;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Error when creating a product",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
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
      throw new HttpException(
        "Error when getting a product",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //
  async delete(deleteProductDto: DeleteProductDto) {
    try {
      const checkProduct = await this.productsRepository.findOne({
        where: { id: deleteProductDto.id, userId: deleteProductDto.userId },
      });

      if (!checkProduct) {
        throw new BadRequestException("This product does not exist");
      }

      const deleteImg = await this.fileServise.deleteFile(checkProduct.img);

      const product = await checkProduct.destroy();

      return checkProduct;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Error when deleting a product",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //
  async update(updateProductDto: DeleteProductDto) {
    try {
    } catch (error) {}
  }
}
