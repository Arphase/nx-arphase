import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { AuthGuard } from '@ivt/auth';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@ivt/auth').then((m) => m.AuthModule),
  },
  {
    path: 'spa',
    loadChildren: () => import('@ivt/spa').then((m) => m.SpaModule),
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
