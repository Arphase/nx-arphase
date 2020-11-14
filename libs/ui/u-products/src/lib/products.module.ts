import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductsComponent } from './products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { IvtUiModule } from '@ivt/u-ui';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, IvtUiModule],
  declarations: [ProductFormComponent, ProductFormContainerComponent, ProductsComponent],
})
export class ProductsModule {}
