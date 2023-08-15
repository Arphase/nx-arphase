import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';

import { CategoryDataService } from './services/category-data.service';
import { CategoriesEfects } from './state/categories.effects';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([CategoriesEfects])],
})
export class CategoriesDataModule {
  constructor(entityDataService: EntityDataService, categoryDataService: CategoryDataService) {
    entityDataService.registerService('Category', categoryDataService);
  }
}
