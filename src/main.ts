import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true
    }
  ))
  await app.listen(8080);


}
bootstrap();
