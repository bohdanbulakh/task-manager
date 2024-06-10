import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap () {
  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }
  ));
  await app.listen(port, () => console.info(`App listening on 127.0.0.1:${port}`));
}
bootstrap();
