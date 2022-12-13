import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GtagModule } from '@arphase/ui/gtag';
import { HttpProxyService, MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    BrowserAnimationsModule,
    GtagModule.init({ targetId: 'G-MML7RZ5PG4', production: environment.production, moreIds: ['AW-697727149'] }),
  ],
  providers: [
    { provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: MUSIC_REVOLUTION_CONFIGURATION_VALUE },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
