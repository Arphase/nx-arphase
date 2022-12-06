import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsDataModule } from '@musicr/ui/products/data';

import { ProductSelectDirective } from './product-select.directive';

@NgModule({
  declarations: [ProductSelectDirective],
  imports: [CommonModule, ProductsDataModule],
  exports: [ProductSelectDirective],
})
export class ProductSelectModule {}
