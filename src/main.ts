import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ZodExceptionFilter } from './filters/ZodException.filter';
import { AllExceptionsFilter } from './filters/AllExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}

bootstrap();
