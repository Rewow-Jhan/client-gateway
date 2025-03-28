import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {

  const logger = new Logger('Gateway');
  
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(envs.PORT);

  logger.log(`Gateway running on http://localhost:${envs.PORT}`);
}

bootstrap();
