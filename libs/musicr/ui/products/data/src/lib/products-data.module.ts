import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { EntityDataService } from '@ngrx/data';

import { AdditionalOptionDataService } from './services/additional-option-data.service';
import { PhotoDataService } from './services/photo-data.service';
import { PriceOptionDataService } from './services/price-option-data.service';
import { ProductDataService } from './services/product-data.service';

@NgModule({
  imports: [CommonModule],
})
export class ProductsDataModule {
  constructor(
    entityDataService: EntityDataService,
    additionalOptionDataService: AdditionalOptionDataService,
    photoDataService: PhotoDataService,
    priceOptionDataService: PriceOptionDataService,
    productDataService: ProductDataService
  ) {
    const services: Record<string, ApsDataService<unknown>> = {
      AdditionalOption: additionalOptionDataService,
      Photo: photoDataService,
      PriceOption: priceOptionDataService,
      Product: productDataService,
    };
    entityDataService.registerServices(services);
  }
}
