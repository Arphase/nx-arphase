import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  dsn: 'https://510baf63117e46869364ef3a7e2b6df4@o509882.ingest.sentry.io/5604936',
  environment: environment.environmentName,
  autoSessionTracking: true,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
