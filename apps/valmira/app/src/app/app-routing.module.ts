import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@valmira/ui/landing').then(m => m.LandingModule),
  },
  {
    path: 'manifest',
    loadChildren: () => import('@valmira/ui/manifest').then(m => m.ManifestModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
