/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { environment } from '@api/env/environment';
import { SentryInterceptor } from '@ivt/a-state';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as bodyParser from 'body-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new SentryInterceptor());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();
  const port = process.env.PORT || environment.server.port;

  Sentry.init({
    dsn: 'https://5ef3606696264220b6259afebdd0a635@o509882.ingest.sentry.io/5604926',
    environment: environment.environmentName,
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
