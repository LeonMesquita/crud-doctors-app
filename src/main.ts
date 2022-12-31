import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadEnvVariables } from './loader';

async function bootstrap() {
  await loadEnvVariables();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  console.log(process.env.DATABASE_URL);

  await app.listen(5000);
}
bootstrap();
