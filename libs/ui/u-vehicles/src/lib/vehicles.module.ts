import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VehiclesDataModule } from '@ivt/u-state';
import {
  IvtEmptyModule,
  IvtGoBackTitleModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtTableHeaderModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';

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
    IvtGoBackTitleModule,
    IvtSearchbarModule,
    NzEmptyModule,
    IvtTableHeaderModule,
    IvtVirtualScrollModule,
    IvtRowModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    NzButtonModule,
    MatDialogModule,
    MatTooltipModule,
    NzGridModule,
    NzMessageModule,
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
