import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { SubcategoryDataService } from './services/subcategory-data.service';

@NgModule({
  imports: [CommonModule],
})
export class SubcategoriesDataModule {
  constructor(entityDataService: EntityDataService, subcategoryDataService: SubcategoryDataService) {
    entityDataService.registerService('Subcategory', subcategoryDataService);
  }
}
