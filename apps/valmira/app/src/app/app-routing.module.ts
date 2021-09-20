import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@valmira/ui/landing').then(m => m.LandingModule),
  },
  {
    path: 'search',
    loadChildren: () => import('@valmira/ui/place-search').then(m => m.PlaceSearchModule),
  },
  {
    path: 'place',
    loadChildren: () => import('@valmira/ui/place-detail').then(m => m.PlaceDetailModule),
  },
  {
    path: 'manifest',
    loadChildren: () => import('@valmira/ui/manifest').then(m => m.ManifestModule),
  },
  {
    path: 'frequent-questions',
    loadChildren: () => import('@valmira/ui/frequent-questions').then(m => m.FrequentQuestionsModule),
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('@valmira/ui/terms-and-conditions').then(m => m.TermsAndConditionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
