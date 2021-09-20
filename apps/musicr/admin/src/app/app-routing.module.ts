import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, SpaGuard } from '@musicr/ui/auth/data';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@musicr/ui/auth/feature').then(m => m.AuthModule),
    canActivate: [SpaGuard],
  },
  {
    path: 'spa',
    loadChildren: () => import('@musicr/ui/spa').then(m => m.SpaModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
