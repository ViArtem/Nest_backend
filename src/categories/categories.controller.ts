import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoriesDto } from "./dto/get-categories.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("category")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() categoryDto: CreateCategoryDto, @UploadedFile() image) {
    return this.categoriesService.create(categoryDto, image);
  }

  @Get("get/all")
  getAll(@Body() getCategoriesDto: GetCategoriesDto) {
    return this.categoriesService.getAll(getCategoriesDto);
  }

  @Delete("delete")
  delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
    return this.categoriesService.delete(deleteCategoryDto);
  }

  @Put("update")
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(updateCategoryDto);
  }

  @Post("count")
  getCategoryCount(@Body() userId: object) {
    return this.categoriesService.count(userId);
  }
}
