import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsDataModule } from '@innovatech/ui/products/data';

import { ProductSelectDirective } from './product-select.directive';

@NgModule({
  imports: [CommonModule, ProductsDataModule],
  declarations: [ProductSelectDirective],
  exports: [ProductSelectDirective],
})
export class ProductSelectModule {}
