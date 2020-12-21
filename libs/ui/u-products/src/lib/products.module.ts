import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtUiModule } from '@ivt/u-ui';
import { ShowdownModule } from 'ngx-showdown';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, IvtUiModule, ShowdownModule],
  declarations: [
    ProductFormComponent,
    ProductFormContainerComponent,
    ProductsComponent,
    ProductListComponent,
    ProductListContainerComponent,
    ProductRowComponent,
  ],
})
export class ProductsModule {}
