import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  IvtEmptyModule,
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
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
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
    NzEmptyModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    IvtFileUploadModule,
    IvtTextTruncateTooltipModule,
    IvtRowModule,
    IvtFolioModule,
    IvtEmptyModule,
    NzIconModule,
    NgxMaskModule,
    NzGridModule,
    NzMessageModule,
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
