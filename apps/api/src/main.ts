import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5050;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors(); // for localhost frontend requests

  const config = new DocumentBuilder() // swagger init
    .setTitle('easy workshop')
    .setDescription('web-based software for 3d modeling and printion')
    .setVersion('alpha')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.listen(PORT, () => console.log(`app is working on port: ${PORT}`));
}

bootstrap();
