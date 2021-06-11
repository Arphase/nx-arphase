import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'terms-and-conditons',
    loadChildren: () => import('@musicr/terms-and-conditions').then(m => m.MusicrTermsAndConditionsModule),
  },
  {
    path: '',
    redirectTo: 'terms-and-conditons',
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
