/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as bodyParser from 'body-parser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { SentryInterceptor } from './sentry.inerceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, transformOptions: { enableImplicitConversion: true } })
  );
  app.useGlobalInterceptors(new SentryInterceptor());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.PORT || environment.server.port;

  Sentry.init({
    dsn: 'https://9580c02b4b9c41c48cd504340f7aac0a@o509882.ingest.sentry.io/5999262',
    environment: environment.environmentName,
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch(err => console.error(err));
}
