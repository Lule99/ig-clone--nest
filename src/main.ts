import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import Constants from './helpers/utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(bodyParser.json({ limit: Constants.uploadLimitMB }));
  app.use(
    bodyParser.urlencoded({ limit: Constants.uploadLimitMB, extended: true }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(8080);
}

bootstrap();
