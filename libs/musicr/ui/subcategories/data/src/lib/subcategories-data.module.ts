import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { EntityDataService } from '@ngrx/data';

import { SubcategoryDataService } from './services/subcategory-data.service';
import { SubcategoryFilterDataService } from './services/subcategory-filter-data.service';

@NgModule({
  imports: [CommonModule],
})
export class SubcategoriesDataModule {
  constructor(
    entityDataService: EntityDataService,
    subcategoryDataService: SubcategoryDataService,
    subcategoryFilterDataService: SubcategoryFilterDataService
  ) {
    const services: Record<string, ApsDataService<unknown>> = {
      Subcategory: subcategoryDataService,
      SubcategoryFilter: subcategoryFilterDataService,
    };
    entityDataService.registerServices(services);
  }
}
