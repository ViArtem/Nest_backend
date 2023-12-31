import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  BadRequestException,
  HttpException,
} from "@nestjs/common";
import { Categories } from "./categories.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoriesDto } from "./dto/get-categories.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { FilesService } from "src/files/files.service";
import { UpdateImageDto } from "./dto/update-category-image.dto";

import { RefreshService } from "src/refresh/refresh.service";

import * as uuid from "uuid";

@Injectable()
export class CategoriesService {
  constructor(
    @Inject("CATEGORIES_REPOSITORY")
    private categoryRepository: typeof Categories,
    private filesService: FilesService,
    private tokenService: RefreshService
  ) {}

  async create(categoryData: CreateCategoryDto, image: any): Promise<object> {
    try {
      if (!image) {
        throw new BadRequestException("Image required");
      }

      // TODO: тут винести окремо зараз роблю щоб фронт мав доступ до функції

      const decodeToken = await this.tokenService.decodeRefresh(
        categoryData.userId
      );

      categoryData.userId = decodeToken.id;

      //

      const checkCategory = await this.categoryRepository.findOne({
        where: {
          userId: categoryData.userId,
          name: categoryData.name,
        },
      });

      if (checkCategory) {
        throw new BadRequestException("This category already exists");
      }
      const fileName = await this.filesService.saveFile(image);

      const category = await this.categoryRepository.create({
        id: uuid.v4(),
        ...categoryData,
        image: fileName,
      });

      if (category) {
        return {
          error: false,
          success: "Сategory successfully created",
          statusCode: 201,
        };
      }

      return category;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new NotAcceptableException(error.parent.sqlMessage);
      }

      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async getAll(categoriesDto: GetCategoriesDto): Promise<object[]> {
    try {
      const offset = (categoriesDto.page - 1) * categoriesDto.limit;

      const { rows: categories, count: totalCount } =
        await this.categoryRepository.findAndCountAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            userId: categoriesDto.userId,
          },
          offset,
          order: [["_id", "ASC"]],
          limit: categoriesDto.limit,
        });

      const totalPages = Math.ceil(totalCount / categoriesDto.limit);

      if (categories.length === 0) {
        return categories;
      }

      if (categoriesDto.page > totalPages) {
        throw new NotFoundException("Page not found");
      }

      return categories;
    } catch (error) {
      if (error.name === "SequelizeError") {
        throw new BadRequestException("Invalid request");
      }
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async delete(deleteCategoryDto: DeleteCategoryDto): Promise<object> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          name: deleteCategoryDto.name,
          userId: deleteCategoryDto.userId,
        },
      });

      if (!category) {
        throw new NotFoundException("Category not found");
      }

      const deleteImageFromServerStatus = await this.filesService.deleteFile(
        category.image
      );

      if (!deleteImageFromServerStatus) {
        console.log(deleteImageFromServerStatus);

        throw new HttpException(
          "Something went wrong when deleting a category",
          500
        );
      }

      await category.destroy();

      return {
        error: false,
        success: "Сategory successfully deleted",
        statusCode: 200,
      };
    } catch (error) {
      if (error.name === "SequelizeError") {
        throw new BadRequestException("Invalid request");
      }
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async update(updateCategoryDto: UpdateCategoryDto): Promise<object> {
    try {
      const checkCategory = await this.categoryRepository.findOne({
        where: {
          id: updateCategoryDto.id,
        },
      });

      if (
        checkCategory.id !== updateCategoryDto.id &&
        checkCategory.name === updateCategoryDto.name
      ) {
        throw new BadRequestException("This category already exists");
      }

      await this.categoryRepository.update(updateCategoryDto, {
        where: { id: updateCategoryDto.id },
      });

      return {
        error: false,
        success: "Сategory successfully updated",
        statusCode: 200,
      };
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new NotAcceptableException(error.parent.sqlMessage);
      }

      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async updateImage(updateImage: UpdateImageDto, image: any): Promise<object> {
    try {
      if (!image) {
        throw new BadRequestException("Image required");
      }

      // TODO: тут винести окремо зараз роблю щоб фронт мав доступ до функції

      const decodeToken = await this.tokenService.decodeRefresh(
        updateImage.userId
      );

      updateImage.userId = decodeToken.id;

      //
      const category = await this.categoryRepository.findOne({
        where: {
          userId: updateImage.userId,
          id: updateImage.id,
        },
      });

      if (!category) {
        throw new BadRequestException("This category don't exists");
      }

      await this.filesService.deleteFile(category.image);

      const imageName = await this.filesService.saveFile(image);

      category.image = imageName;

      await category.save();

      return {
        error: false,
        success: "Сategory image successfully updated",
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async count(userIdData: object): Promise<object> {
    try {
      const userId = userIdData["userId"];

      console.log(userId);

      const categoryCount = await this.categoryRepository.count({
        where: { userId },
      });

      return {
        categoryCount,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  //
  async getById(categoryId: string) {
    try {
      const category = this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      return category;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
