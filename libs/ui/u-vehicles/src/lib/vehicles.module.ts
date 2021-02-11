import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VehiclesDataModule } from '@ivt/u-state';
import {
  IvtEmptyModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtTableHeaderModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { VehicleFormWrapperComponent } from './components/vehicle-form-wrapper/vehicle-form-wrapper.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleRowComponent } from './components/vehicle-row/vehicle-row.component';
import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehicleFormModule } from './public';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';

@NgModule({
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    VehicleFormModule,
    VehiclesDataModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    IvtSearchbarModule,
    NzEmptyModule,
    IvtTableHeaderModule,
    IvtVirtualScrollModule,
    IvtRowModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    NzIconModule,
    NzCardModule,
    NzButtonModule,
    MatDialogModule,
    MatTooltipModule,
    NzGridModule,
    NzMessageModule,
    NzDropDownModule,
  ],
  declarations: [
    VehicleListComponent,
    VehicleListContainerComponent,
    VehicleFormContainerComponent,
    VehiclesComponent,
    VehicleFormWrapperComponent,
    VehicleRowComponent,
  ],
})
export class VehiclesModule {}
