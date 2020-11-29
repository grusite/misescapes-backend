import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const port = process.env.PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Added swagger to document the api
  const options = new DocumentBuilder()
    .setTitle('Misescapes')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Escapes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
