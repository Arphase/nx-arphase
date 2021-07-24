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
  {
    path: 'frequent-questions',
    loadChildren: () => import('@valmira/ui/frequent-questions').then(m => m.FrequentQuestionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
