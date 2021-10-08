import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  dsn: 'https://413449cc279946219b497625581c817e@o509882.ingest.sentry.io/5999325',
  environment: environment.environmentName,
  autoSessionTracking: true,
  integrations: [new Sentry.Integrations.TryCatch({ XMLHttpRequest: false })],
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
