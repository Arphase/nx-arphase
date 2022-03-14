import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { GtagConfig, GtagConfigToken, gtagFactory } from './gtag-factory';
import { GtagDirective } from './gtag.directive';
import { GTAG, GtagService } from './gtag.service';

@NgModule({
  providers: [GtagService],
  declarations: [GtagDirective],
  exports: [GtagDirective],
})
export class GtagModule {
  static init(config: GtagConfig): ModuleWithProviders<GtagModule> {
    return {
      ngModule: GtagModule,
      providers: [
        { provide: GtagConfigToken, useValue: config },
        { provide: GTAG, useFactory: gtagFactory, deps: [[new Optional(), new Inject(GtagConfigToken)]] },
      ],
    };
  }
}
