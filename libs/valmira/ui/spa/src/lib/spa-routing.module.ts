import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpaComponent } from './spa.component';

const routes: Routes = [
  {
    path: '',
    component: SpaComponent,
    children: [
      {
        path: 'reservations',
        loadChildren: () => import('@valmira/ui/reservations').then(m => m.ReservationsModule),
      },
      {
        path: 'places',
        loadChildren: () => import('@valmira/ui/places/feature').then(m => m.PlacesModule),
      },
      {
        path: 'promocodes',
        loadChildren: () => import('@valmira/ui/promocodes').then(m => m.PromocodesModule),
      },
      {
        path: 'additional-products',
        loadChildren: () => import('@valmira/ui/additional-products/feature').then(m => m.AdditionalProductsModule),
      },
      {
        path: '',
        redirectTo: 'reservations',
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
