import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@musicr/ui/home').then(m => m.MusicrHomeModule),
  },
  {
    path: 'terms-and-conditons',
    loadChildren: () => import('@musicr/ui/terms-and-conditions').then(m => m.MusicrTermsAndConditionsModule),
  },
  {
    path: '',
    redirectTo: 'home',
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
