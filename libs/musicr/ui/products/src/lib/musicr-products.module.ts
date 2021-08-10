import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { ProductsCatalogContainerComponent } from './containers/products-catalog-container/products-catalog-container.component';
import { MusicrProductsRoutingModule } from './musicr-products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [CommonModule, MusicrProductsRoutingModule],
  declarations: [
    ProductsCatalogComponent,
    ProductsCatalogContainerComponent,
    ProductsComponent
  ],
})
export class MusicrProductsModule {}
