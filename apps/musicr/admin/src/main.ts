import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  dsn: 'https://0a0862d5bf1843e4a777c5e2b95651c0@o509882.ingest.sentry.io/5999321',
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
