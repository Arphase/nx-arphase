import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { CategoriesDataModule } from '@musicr/ui/categories/data';
import { ProductsDataModule } from '@musicr/ui/products/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormContainerComponent } from './containers/category-form-container/category-form-container.component';
import { CategoryListContainerComponent } from './containers/category-list-container/category-list-container.component';

@NgModule({
  imports: [
    ApsAutoErrorModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsSearchbarModule,
    CategoriesDataModule,
    CategoriesRoutingModule,
    CommonModule,
    DragDropModule,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzDatePickerModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzListModule,
    NzMessageModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTableModule,
    NzUploadModule,
    ProductsDataModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CategoryListContainerComponent,
    CategoryFormContainerComponent,
    CategoryFormComponent,
    CategoryListComponent,
  ],
})
export class CategoriesModule {}
