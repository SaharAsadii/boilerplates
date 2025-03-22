import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from Vite frontend
    credentials: true, // Allow cookies & authorization headers
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all methods
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
