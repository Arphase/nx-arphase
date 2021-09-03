import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { EntityDataService } from '@ngrx/data';

import { CategoryFilterDataService } from './services';
import { CategoryDataService } from './services/category-data.service';

@NgModule({
  imports: [CommonModule],
})
export class CategoriesDataModule {
  constructor(
    entityDataService: EntityDataService,
    categoryDataService: CategoryDataService,
    categoryFilterDataService: CategoryFilterDataService
  ) {
    const services: Record<string, ApsDataService<unknown>> = {
      Category: categoryDataService,
      CategoryFilter: categoryFilterDataService,
    };
    entityDataService.registerServices(services);
  }
}
