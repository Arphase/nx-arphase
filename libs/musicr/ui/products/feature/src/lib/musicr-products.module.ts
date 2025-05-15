import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductDetailContainerComponent } from './containers/product-detail-container/product-detail-container.component';
import { MusicrProductsRoutingModule } from './musicr-products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MusicrProductsRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzCarouselModule,
    NzCheckboxModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzInputNumberModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzSkeletonModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductDetailContainerComponent, ProductDetailComponent],
})
export class MusicrProductsModule {}
