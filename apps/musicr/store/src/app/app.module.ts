import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingInterceptorService } from '@arphase/ui/core';
import {
  FooterModule,
  HttpProxyService,
  MenuModule,
  MUSIC_REVOLUTION_CONFIGURATION,
  MusicRevolutionConfiguration,
} from '@musicr/ui/core';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgxMaskModule } from 'ngx-mask';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { icons } from './icons';

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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    NzIconModule.forRoot(icons),
    MenuModule,
    FooterModule,
    BrowserAnimationsModule,
    NzMessageModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: MUSIC_REVOLUTION_CONFIGURATION_VALUE },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
