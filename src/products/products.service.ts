import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.product.findMany({
      where: {
        is_active: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async createProduct(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // Métodos adicionales útiles
  async getProductsByCategory(categoryId: string) {
    return this.prisma.product.findMany({
      where: {
        category_id: categoryId,
        is_active: true,
      },
      include: {
        category: true,
      },
    });
  }

  async searchProducts(search: string) {
    return this.prisma.product.findMany({
      where: {
        is_active: true,
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        category: true,
      },
    });
  }
}
