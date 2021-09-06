import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubcategoriesDataModule } from '@musicr/ui/subcategories/data';

import { SubcategorySelectDirective } from './subcategory-select.directive';

@NgModule({
  declarations: [SubcategorySelectDirective],
  imports: [CommonModule, SubcategoriesDataModule],
  exports: [SubcategorySelectDirective],
})
export class SubcategorySelectModule {}
