import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsEmptyModule, ApsSearchbarModule } from '@arphase/ui';
import { IvtFolioModule } from '@innovatech/ui/core/ui';
import { ProductsDataModule } from '@innovatech/ui/products/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    IvtFolioModule,
    ApsEmptyModule,
    NzIconModule,
    NgxMaskModule,
    NzGridModule,
    NzMessageModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTypographyModule,
    NzToolTipModule,
    NzCardModule,
    NzButtonModule,
    NzSpaceModule,
    NzUploadModule,
    ApsSearchbarModule,
    NzDividerModule,
    NzTableModule,
    NzAlertModule,
    ProductsDataModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    ProductFormComponent,
    ProductFormContainerComponent,
    ProductsComponent,
    ProductListComponent,
    ProductListContainerComponent,
  ],
})
export class ProductsModule {}
