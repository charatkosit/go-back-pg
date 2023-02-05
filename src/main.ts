import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // app.enableCors({
  //   origin: ['http://172.41.62.164:3000', 'http://172.41.60.18:3000'],
  //   methods: ['GET', 'POST'],
  //   credentials: false,
  // });
  await app.listen(3000);
}
bootstrap();
