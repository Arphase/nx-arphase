import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { CategoriesDataModule } from '@musicr/ui/categories/data';
import { CategorySelectModule } from '@musicr/ui/categories/ui';
import { ProductsDataModule } from '@musicr/ui/products/data';
import { SubcategoriesDataModule } from '@musicr/ui/subcategories/data';
import { SubcategorySelectModule } from '@musicr/ui/subcategories/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxMaskDirective } from 'ngx-mask';

import { AdminProductsRoutingModule } from './admin-products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';

@NgModule({
  imports: [
    AdminProductsRoutingModule,
    ApsAutoErrorModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsSearchbarModule,
    CategoriesDataModule,
    CategorySelectModule,
    CommonModule,
    NgxMaskDirective,
    NzButtonModule,
    NzCollapseModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzSpaceModule,
    NzTableModule,
    NzToolTipModule,
    NzUploadModule,
    ProductsDataModule,
    ReactiveFormsModule,
    SubcategoriesDataModule,
    SubcategorySelectModule,
  ],
  declarations: [ProductListContainerComponent, ProductListComponent],
})
export class AdminProductsModule {}
