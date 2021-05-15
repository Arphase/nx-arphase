import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from '@innovatech/common/domain';
import { RoleGuard } from '@ivt/u-ui';

import { SpaComponent } from './spa.component';

const routes: Routes = [
  {
    path: '',
    component: SpaComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('@innovatech/ui/dashboard').then(m => m.DashboardModule),
      },
      {
        path: 'guarantees',
        loadChildren: () => import('@innovatech/ui/guarantees').then(m => m.GuaranteesModule),
      },
      {
        path: 'groups',
        canActivate: [RoleGuard],
        data: {
          roles: [UserRoles.superAdmin],
        },
        loadChildren: () => import('@ivt/u-groups').then(m => m.GroupsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('@ivt/u-users').then(m => m.UsersModule),
      },
      {
        path: 'vehicles',
        loadChildren: () => import('@innovatech/ui/vehicles/feature').then(m => m.VehiclesModule),
      },
      {
        path: 'revisions',
        loadChildren: () => import('@innovatech/ui/revisions').then(m => m.RevisionsModule),
      },
      {
        path: 'revision-requests',
        loadChildren: () => import('@innovatech/ui/revision-requests').then(m => m.RevisionRequestsModule),
      },
      {
        path: 'products',
        loadChildren: () => import('@innovatech/ui/products/feature').then(m => m.ProductsModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaRoutingModule {}
