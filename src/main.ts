import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadEnvVariables } from './loader';

async function bootstrap() {
  await loadEnvVariables();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT: number = Number(process.env.PORT) ?? 5000;

  await app.listen(PORT);
}
bootstrap();
