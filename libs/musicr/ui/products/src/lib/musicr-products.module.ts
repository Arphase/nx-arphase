import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { ProductsCatalogContainerComponent } from './containers/products-catalog-container/products-catalog-container.component';
import { MusicrProductsRoutingModule } from './musicr-products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductDetailContainerComponent } from './containers/product-detail-container/product-detail-container.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    MusicrProductsRoutingModule,
    NzGridModule,
    NzIconModule,
    NzDividerModule,
    NzSelectModule,
    NzPageHeaderModule,
    NzButtonModule,
  ],
  declarations: [
    ProductsCatalogComponent,
    ProductsCatalogContainerComponent,
    ProductsComponent,
    ProductDetailContainerComponent,
    ProductDetailComponent,
  ],
})
export class MusicrProductsModule {}
