import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule, ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { CategoriesDataModule } from '@musicr/ui/categories/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
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

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormContainerComponent } from './containers/category-form-container/category-form-container.component';
import { CategoryListContainerComponent } from './containers/category-list-container/category-list-container.component';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CategoriesDataModule,
    ReactiveFormsModule,
    NzGridModule,
    NzCardModule,
    NzDividerModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzAlertModule,
    NzModalModule,
    ApsSearchbarModule,
    ApsAutoErrorModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
  ],
  declarations: [
    CategoryListContainerComponent,
    CategoryFormContainerComponent,
    CategoryFormComponent,
    CategoryListComponent,
  ],
})
export class CategoriesModule {}
