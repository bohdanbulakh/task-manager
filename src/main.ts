import { NestFactory } from '@nestjs/core';
import { AppModule } from './v1/app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap () {
  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }
  ));

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('System for managing tasks')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => console.info(`App listening on 127.0.0.1:${port}`));
}
bootstrap();
