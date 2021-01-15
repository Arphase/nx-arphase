import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehiclesComponent } from './vehicles.component';

export const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      {
        path: '',
        component: VehicleListContainerComponent,
      },
      {
        path: 'new',
        component: VehicleFormContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
