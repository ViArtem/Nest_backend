import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Categories } from "./categories.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoriesDto } from "./dto/get-categories.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @Inject("CATEGORIES_REPOSITORY")
    private categoryRepository: typeof Categories
  ) {}

  async create(categoryData: CreateCategoryDto): Promise<object> {
    try {
      const checkCategory = await this.categoryRepository.findOne({
        where: {
          userId: categoryData.userId,
          name: categoryData.name,
        },
      });

      if (checkCategory) {
        throw new BadRequestException("This category already exists");
      }

      const category = await this.categoryRepository.create(categoryData);

      return category;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new NotAcceptableException(error.parent.sqlMessage);
      }

      throw error;
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
          limit: categoriesDto.limit,
        });

      const totalPages = Math.ceil(totalCount / categoriesDto.limit);

      if (categoriesDto.page > totalPages) {
        throw new NotFoundException("Page not found");
      }

      return categories;
    } catch (error) {
      if (error.name === "SequelizeError") {
        throw new BadRequestException("Invalid request");
      }
      throw error;
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

      await category.destroy();
      return category;
    } catch (error) {
      if (error.name === "SequelizeError") {
        throw new BadRequestException("Invalid request");
      }
      throw error;
    }
  }

  //
  async update(updateCategoryDto: UpdateCategoryDto) {
    try {
      const checkCategory = await this.categoryRepository.findOne({
        where: {
          userId: updateCategoryDto.userId,
          name: updateCategoryDto.name,
        },
      });

      if (checkCategory) {
        throw new BadRequestException("This category already exists");
      }

      const category = await this.categoryRepository.update(updateCategoryDto, {
        where: { id: updateCategoryDto.id },
      });

      return updateCategoryDto;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new NotAcceptableException(error.parent.sqlMessage);
      }

      throw error;
    }
  }

  //
  async count(userIdData: object): Promise<object> {
    try {
      const userId = userIdData["userId"];

      const categoryCount = await this.categoryRepository.count({
        where: { userId },
      });

      return {
        categoryCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
