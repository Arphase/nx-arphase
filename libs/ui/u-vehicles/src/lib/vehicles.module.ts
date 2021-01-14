import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { VehicleFormWrapperComponent } from './components/vehicle-form-wrapper/vehicle-form-wrapper.component';

@NgModule({
  imports: [CommonModule, VehiclesRoutingModule],
  declarations: [VehicleListComponent, VehicleListContainerComponent, VehicleFormContainerComponent, VehiclesComponent, VehicleFormWrapperComponent],
})
export class VehiclesModule {}
