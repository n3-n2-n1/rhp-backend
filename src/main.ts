import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4321',
      'https://distribuidorarhp.com',
      'https://www.distribuidorarhp.com',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  // Pipes globales
  app.useGlobalPipes(new ValidationPipe());

  // Puerto
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`🚀 API running on port ${port}`);
}
bootstrap();
