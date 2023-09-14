import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
  Patch,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { GetCategoriesDto } from "./dto/get-categories.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateImageDto } from "./dto/update-category-image.dto";

@Controller("category")
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService //private helpers: Helpers
  ) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() categoryDto: CreateCategoryDto,
    @Req() req: Request,
    @UploadedFile() image
  ) {
    //this.helpers.getUserIdFromToken(req.cookies.refresh);
    categoryDto.userId = req.cookies.refresh;
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

  @UseInterceptors(FileInterceptor("image"))
  @Patch("update/image")
  updateImage(
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFile() image,
    @Req() req: Request
  ) {
    updateImageDto.userId = req.cookies.refresh;
    return this.categoriesService.updateImage(updateImageDto, image);
  }

  @Post("count")
  getCategoryCount(@Body() userData: object) {
    return this.categoriesService.count(userData);
  }
}
