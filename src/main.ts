import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Memory Card')
    .setDescription('API para o projeto de Memorycard')
    .setVersion('1.0')
    .addTag('Memorycard')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.getHttpAdapter();

  app.getHttpAdapter().get('/', (_req, res) => {
    Logger.log('🚀 Servidor Rodando');
    res.send({ message: '🚀 Servidor iniciado com sucesso!' });
  });

  const port = process.env.PORT ?? 3000;

  await app.listen(port);
  console.log(`🚀 API rodando em http://localhost:${port}`);
  console.log(`🚀 SWAGGER rodando em http://localhost:${port}/api/docs`);
}
bootstrap();
