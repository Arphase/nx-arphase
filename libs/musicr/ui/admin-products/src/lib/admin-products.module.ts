import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ApsAutoErrorModule,
  ApsDataService,
  ApsEmptyModule,
  ApsFeatureLayoutModule,
  ApsSearchbarModule,
} from '@arphase/ui/core';
import { CategoriesDataModule } from '@musicr/ui/categories/data';
import { CategorySelectModule } from '@musicr/ui/categories/ui';
import { SubcategoriesDataModule } from '@musicr/ui/subcategories/data';
import { SubcategorySelectModule } from '@musicr/ui/subcategories/ui';
import { EntityDataService } from '@ngrx/data';
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
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AdditionalOptionsFormContainerComponent } from './containers/additional-options-form-container/additional-options-form-container.component';
import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { AdditionalOptionDataService } from './services/additional-option-data.service';
import { PhotoDataService } from './services/photo-data.service';
import { ProductDataService } from './services/product-data.service';

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
  ],
})
export class AdminProductsModule {
  constructor(
    entityDataService: EntityDataService,
    additionalOptionDataService: AdditionalOptionDataService,
    photoDataService: PhotoDataService,
    productDataService: ProductDataService
  ) {
    const services: Record<string, ApsDataService<unknown>> = {
      AdditionalOption: additionalOptionDataService,
      Photo: photoDataService,
      Product: productDataService,
    };
    entityDataService.registerServices(services);
  }
}
