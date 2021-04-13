import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, SpaGuard } from '@ivt/u-auth';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@ivt/u-auth').then(m => m.AuthModule),
    canActivate: [SpaGuard],
  },
  {
    path: 'spa',
    loadChildren: () => import('@ivt/u-spa').then(m => m.SpaModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
