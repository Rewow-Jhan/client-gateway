import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { ExceptionFilter } from './common/exceptions/rpc-exception.filter';

async function bootstrap() {

  const logger = new Logger('Gateway');
  
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(envs.port);

  logger.log(`Gateway running on http://localhost:${envs.port}`);
}

bootstrap();
