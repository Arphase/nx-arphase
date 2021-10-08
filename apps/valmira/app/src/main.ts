import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  dsn: 'https://1623157309ec45eda9e265f2447c510b@o509882.ingest.sentry.io/5999327',
  environment: environment.environmentName,
  autoSessionTracking: true,
  integrations: [new Sentry.Integrations.TryCatch({ XMLHttpRequest: false })],
});

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
