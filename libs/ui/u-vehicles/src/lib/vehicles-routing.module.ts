import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleFormContainerComponent } from './containers/vehicle-form-container/vehicle-form-container.component';
import { VehicleListContainerComponent } from './containers/vehicle-list-container/vehicle-list-container.component';
import { VehicleResolverService } from './resolvers/vehicle-resolver.service';
import { VehiclesResolverService } from './resolvers/vehicles-resolver.service';
import { VehiclesComponent } from './vehicles.component';

export const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      {
        path: '',
        component: VehicleListContainerComponent,
        resolve: { resolvedVehicles: VehiclesResolverService },
      },
      {
        path: 'new',
        component: VehicleFormContainerComponent,
        resolve: { resolvedVehicle: VehicleResolverService },
      },
      {
        path: ':id',
        component: VehicleFormContainerComponent,
        resolve: { resolvedVehicle: VehicleResolverService },
      },
      {
        path: ':id/revisions',
        loadChildren: () => import('@ivt/u-revisions').then(m => m.RevisionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}