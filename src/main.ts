import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ClientErrorInterceptor } from './common/interceptors/client-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const logger: Logger = new Logger();
  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClientErrorInterceptor(logger));
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(SERVER_PORT || 8080);

  logger.log(`Start Run: ${SERVER_PORT}`);
}
bootstrap();
