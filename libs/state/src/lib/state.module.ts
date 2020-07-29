import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from './auth/state';
import { TokenInterceptor } from './core/interceptors/http-interceptor';
import { reducers } from './reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'IVT UI',
      maxAge: 25,
    }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class IvtStateModule {}
