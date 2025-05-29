import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, SpaGuard } from '@innovatech/ui/auth/data';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@innovatech/ui/auth/feature').then(m => m.AuthModule),
    canActivate: [SpaGuard],
  },
  {
    path: 'spa',
    loadChildren: () => import('@innovatech/ui/spa').then(m => m.SpaModule),
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
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
