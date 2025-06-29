import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Prisma } from '../../generated/prisma';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Get('slug/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoriesService.getCategoryBySlug(slug);
  }

  @Post()
  async createCategory(@Body() categoryData: Prisma.CategoryCreateInput) {
    return this.categoriesService.createCategory(categoryData);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: Prisma.CategoryUpdateInput,
  ) {
    return this.categoriesService.updateCategory(id, categoryData);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
