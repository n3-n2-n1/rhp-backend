import {
  Controller,
  Post,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../products/products.service';
import { Octokit } from '@octokit/rest';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
  private readonly baseUrl =
    'https://raw.githubusercontent.com/n3-n2-n1/rhp-backend/main/public/images';
  private readonly octokit: Octokit;
  private readonly owner = 'n3-n2-n1';
  private readonly repo = 'rhp-backend';
  private readonly branch = 'main';
  private readonly path = 'public/images';

  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {
    this.octokit = new Octokit({
      auth: this.configService.get('GITHUB_TOKEN'),
    });
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validar tipo de archivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only JPEG, PNG and WebP images are allowed',
      );
    }

    // Validar tamaño (5MB máximo - límite de GitHub)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    try {
      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.originalname.toLowerCase().replace(/\s+/g, '-')}`;
      const filePath = `${this.path}/${fileName}`;

      // Convertir el buffer a base64
      const content = file.buffer.toString('base64');

      // Subir archivo a GitHub
      await this.octokit.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        message: `Add product image: ${fileName}`,
        content,
        branch: this.branch,
      });

      // Construir URL raw
      const imageUrl = `${this.baseUrl}/${fileName}`;

      return {
        success: true,
        fileName,
        imageUrl,
        message: 'Image uploaded successfully to GitHub',
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to upload image to GitHub: ${error.message}`,
      );
    }
  }

  @Put('product/:productId/image-url')
  async updateProductImageUrl(
    @Param('productId') productId: string,
    @Body() body: { imageName: string },
  ) {
    if (!body.imageName) {
      throw new BadRequestException('imageName is required');
    }

    try {
      // Verificar que el producto existe
      const product = await this.productsService.getProductById(productId);
      if (!product) {
        throw new BadRequestException('Product not found');
      }

      // Crear la URL completa de GitHub
      const imageUrl = `${this.baseUrl}/${body.imageName}`;

      // Actualizar producto con nueva URL
      const updatedProduct = await this.productsService.updateProduct(
        productId,
        {
          image_url: imageUrl,
        },
      );

      return {
        success: true,
        product: updatedProduct,
        message: 'Product image URL updated successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update product image URL: ' + error.message,
      );
    }
  }
}
