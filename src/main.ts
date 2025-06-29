import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuración de CORS
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Pipes globales
  app.useGlobalPipes(new ValidationPipe());

  // Puerto
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`🚀 API running on port ${port}`);
}
bootstrap();
