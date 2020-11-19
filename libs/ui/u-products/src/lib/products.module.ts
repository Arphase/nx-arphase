import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductsComponent } from './products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { IvtUiModule } from '@ivt/u-ui';
import { ShowdownModule } from 'ngx-showdown';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { ProductRowContainerComponent } from './containers/product-row-container/product-row-container.component';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, IvtUiModule, ShowdownModule],
  declarations: [ProductFormComponent, ProductFormContainerComponent, ProductsComponent, ProductListComponent, ProductListContainerComponent, ProductRowComponent, ProductRowContainerComponent],
})
export class ProductsModule {}
