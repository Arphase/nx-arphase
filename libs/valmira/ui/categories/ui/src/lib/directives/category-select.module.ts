import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriesDataModule } from '@valmira/ui/categories/data';

import { CategorySelectDirective } from './category-select.directive';

@NgModule({
  declarations: [CategorySelectDirective],
  imports: [CommonModule, CategoriesDataModule],
  exports: [CategorySelectDirective],
})
export class CategorySelectModule {}
