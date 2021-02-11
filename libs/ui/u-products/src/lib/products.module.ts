import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  IvtEmptyModule,
  IvtEmptyStateModule,
  IvtFileUploadModule,
  IvtFolioModule,
  IvtFormFieldModule,
  IvtGoBackTitleModule,
  IvtInputModule,
  IvtRowModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxMaskModule } from 'ngx-mask';
import { ShowdownModule } from 'ngx-showdown';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ShowdownModule,
    ReactiveFormsModule,
    IvtGoBackTitleModule,
    IvtFormFieldModule,
    IvtInputModule,
    IvtFileUploadModule,
    MatSelectModule,
    IvtEmptyStateModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    IvtFileUploadModule,
    IvtTextTruncateTooltipModule,
    IvtRowModule,
    IvtFolioModule,
    IvtEmptyModule,
    MatIconModule,
    NgxMaskModule,
    NzGridModule,
  ],
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
