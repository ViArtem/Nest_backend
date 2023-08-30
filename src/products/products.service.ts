import {
  Inject,
  Injectable,
  BadRequestException,
  HttpException,
} from "@nestjs/common";
import { Products } from "./product.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetAllCategoryProductDto } from "./dto/get-all-category-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { FilesService } from "src/files/files.service";
import { UpdateProductImageDto } from "./dto/update-product-image.dto";
import { UpdateProductDto } from "./dto/udate-product.dto";

import * as uuid from "uuid";
import { CategoriesService } from "src/categories/categories.service";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCTS_REPOSITORY")
    private productsRepository: typeof Products,
    private filesService: FilesService,
    private categoryService: CategoriesService
  ) {}

  //
  async create(
    createProductDto: CreateProductDto,
    image: any
  ): Promise<object> {
    try {
      if (!image) {
        throw new BadRequestException("Image required");
      }

      const checkProduct = await this.productsRepository.findOne({
        where: { name: createProductDto.name, userId: createProductDto.userId },
      });

      if (checkProduct) {
        throw new BadRequestException("This product already exists");
      }

      const img = await this.filesService.saveFile(image);

      if (createProductDto.price === 0) {
        const category = await this.categoryService.getById(
          createProductDto.categoryId
        );

        createProductDto.price =
          Number(createProductDto.purchasePrice) +
          (createProductDto.purchasePrice / 100) * category.markup;
      }

      const product = await this.productsRepository.create({
        id: uuid.v4(),
        ...createProductDto,
        img,
      });

      return product;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
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
      throw new HttpException(error.message, error.status);
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

      await this.filesService.deleteFile(checkProduct.img);

      await checkProduct.destroy();

      return checkProduct;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  //
  async update(updateProductDto: UpdateProductDto): Promise<object> {
    try {
      const product = await this.productsRepository.findOne({
        where: { name: updateProductDto.name, userId: updateProductDto.userId },
      });

      if (
        product.name === updateProductDto.name &&
        product.id !== updateProductDto.id
      ) {
        throw new BadRequestException("This product already exists");
      }

      await this.productsRepository.update(updateProductDto, {
        where: {
          id: updateProductDto.id,
          userId: updateProductDto.userId,
        },
      });

      return updateProductDto;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  //
  async updateImage(
    updateProductImageDto: UpdateProductImageDto,
    image: any
  ): Promise<string> {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          id: updateProductImageDto.id,
          userId: updateProductImageDto.userId,
        },
      });

      await this.filesService.deleteFile(product.img);

      const imageName = await this.filesService.saveFile(image);

      product.img = imageName;

      await product.save();

      return imageName;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async updatePrice(
    updateProductPriceDto: UpdateProductImageDto
  ): Promise<object> {
    try {
      const product = await this.productsRepository.update(
        updateProductPriceDto,
        {
          where: {
            id: updateProductPriceDto.id,
          },
        }
      );

      return product;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async count(userData: object) {
    try {
      const userId = userData["userId"];

      const productCount = await this.productsRepository.count({
        where: { userId },
      });

      return {
        productCount,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
