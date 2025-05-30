import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ApsCheckboxFilterModule,
  ApsDateFilterModule,
  ApsEmptyModule,
  ApsFeatureLayoutModule,
  ApsRadioFilterModule,
  ApsSearchbarModule,
} from '@arphase/ui/core';
import { CompanyCheckboxFilterModule } from '@innovatech/ui/companies/ui';
import { GroupCheckboxFilterModule } from '@innovatech/ui/groups/ui';
import { PermissionsModule } from '@innovatech/ui/permissions/data';
import { ProductsDataModule } from '@innovatech/ui/products/data';
import { UserCheckboxFilterModule } from '@innovatech/ui/users/ui';
import { VehiclesDataModule } from '@innovatech/ui/vehicles/data';
import { VehicleFormModule } from '@innovatech/ui/vehicles/ui';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { VehicleFormWrapperComponent } from './components/vehicle-form-wrapper/vehicle-form-wrapper.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

@NgModule({
  imports: [
    ApsCheckboxFilterModule,
    ApsDateFilterModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsRadioFilterModule,
    ApsSearchbarModule,
    CommonModule,
    CompanyCheckboxFilterModule,
    GroupCheckboxFilterModule,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzGridModule,
    NzIconModule,
    NzMessageModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTableModule,
    NzTagModule,
    NzToolTipModule,
    NzTypographyModule,
    PermissionsModule,
    ProductsDataModule,
    ReactiveFormsModule,
    UserCheckboxFilterModule,
    VehicleFormModule,
    VehiclesDataModule,
    VehiclesRoutingModule,
  ],
  declarations: [
    VehicleListComponent,
    VehicleListContainerComponent,
    VehicleFormContainerComponent,
    VehicleFormWrapperComponent,
  ],
})
export class VehiclesModule {}
