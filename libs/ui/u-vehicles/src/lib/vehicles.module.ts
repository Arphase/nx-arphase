import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VehiclesDataModule } from '@ivt/u-state';
import { IvtUiModule } from '@ivt/u-ui';

import { VehicleFormWrapperComponent } from './components/vehicle-form-wrapper/vehicle-form-wrapper.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleRowComponent } from './components/vehicle-row/vehicle-row.component';
import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehicleFormModule } from './public';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';

@NgModule({
  imports: [CommonModule, VehiclesRoutingModule, IvtUiModule, VehicleFormModule, VehiclesDataModule],
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
