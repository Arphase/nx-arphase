import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { config } from 'aws-sdk';
import * as bodyParser from 'body-parser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { SentryInterceptor } from './sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, transformOptions: { enableImplicitConversion: true } })
  );

  app.useGlobalInterceptors(new SentryInterceptor());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  Sentry.init({
    dsn: 'https://fa63827a958145b18f4f0f06adc9e39b@o509882.ingest.sentry.io/5999319',
    environment: environment.environmentName,
  });

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  app.enableCors();

  const port = process.env.PORT || environment.server.port;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/api');
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
