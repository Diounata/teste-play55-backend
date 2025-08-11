import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvService);
  const port = configService.get('PORT');
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
