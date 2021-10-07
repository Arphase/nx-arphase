import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule, ApsAutoSelectModule } from '@arphase/ui/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { ProductDetailContainerComponent } from './containers/product-detail-container/product-detail-container.component';
import { ProductsCatalogContainerComponent } from './containers/products-catalog-container/products-catalog-container.component';
import { MusicrProductsRoutingModule } from './musicr-products-routing.module';

@NgModule({
  imports: [
    ApsAutoErrorModule,
    ApsAutoSelectModule,
    CommonModule,
    FormsModule,
    MusicrProductsRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzCarouselModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzInputNumberModule,
    NzPageHeaderModule,
    NzSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProductsCatalogComponent,
    ProductsCatalogContainerComponent,
    ProductDetailContainerComponent,
    ProductDetailComponent,
  ],
})
export class MusicrProductsModule {}
