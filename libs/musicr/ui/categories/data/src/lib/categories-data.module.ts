import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { CategoryDataService } from './services/category-data.service';

@NgModule({
  imports: [CommonModule],
})
export class CategoriesDataModule {
  constructor(entityDataService: EntityDataService, categoryDataService: CategoryDataService) {
    entityDataService.registerService('Category', categoryDataService);
  }
}
