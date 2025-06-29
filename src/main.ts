import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir requests del frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:4200', // Angular
      'http://localhost:4321', // Astro
      'http://localhost:5173', // Vite
      'http://localhost:8080', // Vue CLI
      'https://www.distribuidorarhp.com', // Dominio principal
      'https://distribuidorarhp.com', // Dominio sin www
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    credentials: true, // Para permitir cookies si las usas
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API running on port ${port}`);
}
bootstrap();
