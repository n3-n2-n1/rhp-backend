import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ProductsService } from '../products/products.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [ProductsService, PrismaService, ConfigService],
  exports: [],
})
export class UploadModule {}
