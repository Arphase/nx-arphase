import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { AdditionalProductDataService } from './services/additional-product-data.service';

@NgModule({
  imports: [CommonModule],
})
export class AdditionalProductsDataModule {
  constructor(entityDataService: EntityDataService, additionalProductDataService: AdditionalProductDataService) {
    entityDataService.registerService('AdditionalProduct', additionalProductDataService);
  }
}
