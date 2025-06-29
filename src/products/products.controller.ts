import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '../../generated/prisma';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Query('search') search?: string) {
    if (search) {
      return this.productsService.searchProducts(search);
    }
    return this.productsService.getProducts();
  }

  @Get('category/:categoryId')
  async getProductsByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.getProductsByCategory(categoryId);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() productData: Prisma.ProductCreateInput) {
    return this.productsService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.updateProduct(id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
