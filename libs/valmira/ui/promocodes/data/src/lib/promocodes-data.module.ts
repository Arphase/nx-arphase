import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { PromocodeDataService } from './services/promocode-data.service';

@NgModule({})
export class PromocodesDataModule {
  constructor(entityDataService: EntityDataService, promocodeDataService: PromocodeDataService) {
    entityDataService.registerService('Promocode', promocodeDataService);
  }
}
