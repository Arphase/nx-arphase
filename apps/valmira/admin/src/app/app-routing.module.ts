import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, SpaGuard } from '@valmira/ui/auth/data';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@valmira/ui/auth/feature').then(m => m.AuthModule),
    canActivate: [SpaGuard],
  },
  {
    path: 'spa',
    loadChildren: () => import('@valmira/ui/spa').then(m => m.SpaModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'spa',
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
