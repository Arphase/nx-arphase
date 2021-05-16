import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { ProductDataService } from './services/product-data.service';

@NgModule({})
export class ProductsDataModule {
  constructor(entityDataService: EntityDataService, productDataService: ProductDataService) {
    entityDataService.registerService('Product', productDataService);
  }
}
