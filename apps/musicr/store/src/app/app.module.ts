import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GtagModule } from '@arphase/ui/gtag';
import { HttpProxyService, MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(es);

const MUSIC_REVOLUTION_CONFIGURATION_VALUE: MusicRevolutionConfiguration = {
  apiUrl: environment.apiUrl,
  version: environment.version,
  innovatechUrl: environment.innovatechUrl,
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GtagModule.init({ targetId: 'G-MML7RZ5PG4', production: environment.production, moreIds: ['AW-697727149'] }),
  ],
  providers: [
    { provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: MUSIC_REVOLUTION_CONFIGURATION_VALUE },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyService, multi: true },
    { provide: NZ_I18N, useValue: es_ES },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
