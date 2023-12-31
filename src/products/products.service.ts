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
import { UpdateProductDto } from "./dto/update-product.dto";

import * as uuid from "uuid";
import { CategoriesService } from "src/categories/categories.service";
import { RefreshService } from "src/refresh/refresh.service";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCTS_REPOSITORY")
    private productsRepository: typeof Products,
    private filesService: FilesService,
    private categoryService: CategoriesService,
    private tokenService: RefreshService
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

      //TODO: винести окремо
      const decodeToken = await this.tokenService.decodeRefresh(
        createProductDto.userId
      );

      createProductDto.userId = decodeToken.id;

      //
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
          (Number(createProductDto.purchasePrice) / 100) *
            Number(category.markup);
      }

      const product = await this.productsRepository.create({
        id: uuid.v4(),
        ...createProductDto,
        image: img,
      });

      return {
        error: false,
        success: "Product successfully created",
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async getAllByCategory(getAllCategoryProductDto: GetAllCategoryProductDto) {
    try {
      const offset =
        (getAllCategoryProductDto.page - 1) * getAllCategoryProductDto.limit;

      const products = await this.productsRepository.findAll({
        where: {
          categoryId: getAllCategoryProductDto.categoryId,
          userId: getAllCategoryProductDto.userId,
        },
        offset,
        order: [["_id", "ASC"]],
        limit: getAllCategoryProductDto.limit,
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

      await this.filesService.deleteFile(checkProduct.image);

      await checkProduct.destroy();

      return {
        error: false,
        success: "Product successfully deleted",
        statusCode: 200,
      };
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
        product &&
        product.name === updateProductDto.name &&
        product.id !== updateProductDto.id
      ) {
        throw new BadRequestException("This product already exists");
      }

      await this.productsRepository.update(updateProductDto, {
        where: {
          id: updateProductDto.id,
        },
      });

      return {
        error: false,
        success: "Product successfully updated",
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  //
  async updateImage(
    updateProductImageDto: UpdateProductImageDto,
    image: any
  ): Promise<object> {
    try {
      if (!image) {
        throw new BadRequestException("Image required");
      }

      //TODO: винести окремо
      const decodeToken = await this.tokenService.decodeRefresh(
        updateProductImageDto.userId
      );

      updateProductImageDto.userId = decodeToken.id;

      //
      const product = await this.productsRepository.findOne({
        where: {
          id: updateProductImageDto.id,
          userId: updateProductImageDto.userId,
        },
      });

      await this.filesService.deleteFile(product.image);

      const imageName = await this.filesService.saveFile(image);

      product.image = imageName;

      await product.save();

      return {
        error: false,
        success: "Product image successfully updated",
        statusCode: 200,
      };
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

      return {
        error: false,
        success: "Product price successfully updated",
        statusCode: 200,
      };
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
