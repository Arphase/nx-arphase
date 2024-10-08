import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from '@innovatech/common/domain';
import { RoleGuard } from '@innovatech/ui/auth/data';

import { SpaComponent } from './spa.component';

const routes: Routes = [
  {
    path: '',
    component: SpaComponent,
    children: [
      {
        path: 'guarantees',
        loadChildren: () => import('@innovatech/ui/guarantees').then(m => m.GuaranteesModule),
      },
      {
        path: 'groups',
        canActivate: [RoleGuard],
        data: { roles: [UserRoles.superAdmin] },
        loadChildren: () => import('@innovatech/ui/groups/feature').then(m => m.GroupsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('@innovatech/ui/users/feature').then(m => m.UsersModule),
        canActivate: [RoleGuard],
        data: { roles: [UserRoles.superAdmin] },
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
        canActivate: [RoleGuard],
        data: { roles: [UserRoles.superAdmin] },
      },
      {
        path: '',
        redirectTo: 'guarantees',
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
