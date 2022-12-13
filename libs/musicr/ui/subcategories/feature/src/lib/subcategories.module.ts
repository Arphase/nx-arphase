import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { CategorySelectModule } from '@musicr/ui/categories/ui';
import { SubcategoriesDataModule } from '@musicr/ui/subcategories/data';
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';

import { SubcategoryFormComponent } from './components/subcategory-form/subcategory-form.component';
import { SubcategoryListComponent } from './components/subcategory-list/subcategory-list.component';
import { SubcategoryFormContainerComponent } from './containers/subcategory-form-container/subcategory-form-container.component';
import { SubcategoryListContainerComponent } from './containers/subcategory-list-container/subcategory-list-container.component';
import { SubcategoriesRoutingModule } from './subcategories-routing.module';

@NgModule({
  imports: [
    ApsAutoErrorModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsSearchbarModule,
    CategorySelectModule,
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
    NzSelectModule,
    NzSpaceModule,
    NzTableModule,
    ReactiveFormsModule,
    SubcategoriesDataModule,
    SubcategoriesRoutingModule,
  ],
  declarations: [
    SubcategoryListComponent,
    SubcategoryFormComponent,
    SubcategoryFormContainerComponent,
    SubcategoryListContainerComponent,
  ],
})
export class SubcategoriesModule {}
