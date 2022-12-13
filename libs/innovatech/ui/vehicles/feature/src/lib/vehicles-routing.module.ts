import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';
import { ApsDirtyFormGuard } from '@arphase/ui/forms';

import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehicleResolverService } from './resolvers/vehicle-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Vehículos' },
    children: [
      {
        path: '',
        component: VehicleListContainerComponent,
      },
      {
        path: 'new',
        component: VehicleFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
        resolve: { resolvedVehicle: VehicleResolverService },
      },
      {
        path: ':id',
        component: VehicleFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
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
