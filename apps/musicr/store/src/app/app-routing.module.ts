import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@musicr/ui/home').then(m => m.MusicrHomeModule),
  },
  {
    path: 'products-catalog',
    loadChildren: () => import('@musicr/ui/products').then(m => m.MusicrProductsModule),
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('@musicr/ui/terms-and-conditions').then(m => m.MusicrTermsAndConditionsModule),
  },
  {
    path: 'frequent-questions',
    loadChildren: () => import('@musicr/ui/frequent-questions').then(m => m.FrequentQuestionsModule),
  },
  {
    path: 'about-us',
    loadChildren: () => import('@musicr/ui/about-us').then(m => m.AboutUsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}