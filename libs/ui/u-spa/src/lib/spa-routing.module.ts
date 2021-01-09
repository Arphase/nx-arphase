import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpaComponent } from './spa.component';

const routes: Routes = [
  {
    path: '',
    component: SpaComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('@ivt/u-dashboard').then(m => m.DashboardModule),
      },
      {
        path: 'guarantees',
        loadChildren: () => import('@ivt/u-guarantees').then(m => m.GuaranteesModule),
      },
      {
        path: 'groups',
        loadChildren: () => import('@ivt/u-groups').then(m => m.GroupsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('@ivt/u-users').then(m => m.UsersModule),
      },
      // TODO: uncomment when feature is ready
      // {
      //   path: 'products',
      //   loadChildren: () =>
      //     import('@ivt/u-products').then((m) => m.ProductsModule),
      // },
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
