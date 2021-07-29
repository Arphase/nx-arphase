import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpaComponent } from './spa.component';

const routes: Routes = [
  {
    path: '',
    component: SpaComponent,
    children: [
      {
        path: 'places',
        loadChildren: () => import('@valmira/ui/places').then(m => m.PlacesModule),
      },
      {
        path: 'promocodes',
        loadChildren: () => import('@valmira/ui/promocodes').then(m => m.PromocodesModule),
      },
      {
        path: '',
        redirectTo: 'places',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaRoutingModule {}
