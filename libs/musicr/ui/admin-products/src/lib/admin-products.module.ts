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
import { NgxMaskModule } from 'ngx-mask';

import { AdminProductsroutingModule } from './admin-products-routing.module';
import { AdditionalOptionsFormComponent } from './components/additional-options-form/additional-options-form.component';
import { PriceOptionFormComponent } from './components/price-option-form/price-option-form.component';
import { PriceOptionsFormComponent } from './components/price-options-form/price-options-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AdditionalOptionsFormContainerComponent } from './containers/additional-options-form-container/additional-options-form-container.component';
import { PriceOptionsFormContainerComponent } from './containers/price-options-form-container/price-options-form-container.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';

@NgModule({
  imports: [
    AdminProductsroutingModule,
    ApsAutoErrorModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsSearchbarModule,
    CategoriesDataModule,
    CategorySelectModule,
    CommonModule,
    NgxMaskModule,
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
  declarations: [
    ProductListContainerComponent,
    ProductFormContainerComponent,
    ProductFormComponent,
    ProductListComponent,
    AdditionalOptionsFormContainerComponent,
    AdditionalOptionsFormComponent,
    PriceOptionsFormComponent,
    PriceOptionsFormContainerComponent,
    PriceOptionFormComponent,
  ],
})
export class AdminProductsModule {}
