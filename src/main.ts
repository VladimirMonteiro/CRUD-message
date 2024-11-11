import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove chaves que não estão no Dto.
    forbidNonWhitelisted: true, // Levantar erro quando a chave não existir.
    transform: false // Tenta converter um param
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
