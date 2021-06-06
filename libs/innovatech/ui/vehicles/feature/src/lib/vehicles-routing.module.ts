import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IvtDirtyFormGuard } from '@arphase/ui';

import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehicleResolverService } from './resolvers/vehicle-resolver.service';
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
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedVehicle: VehicleResolverService },
      },
      {
        path: ':id',
        component: VehicleFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedVehicle: VehicleResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
