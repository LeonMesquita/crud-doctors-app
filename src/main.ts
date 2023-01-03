import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadEnvVariables } from './loader';

async function bootstrap() {
  await loadEnvVariables();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('API CRUD Doctors')
    .setVersion('1.0')
    .addTag('Doctors')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT: number = Number(process.env.PORT) ?? 5000;

  await app.listen(PORT);
}
bootstrap();
