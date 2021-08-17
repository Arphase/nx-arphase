import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationListContainerComponent } from './containers/reservation-list-container/reservation-list-container.component';
import { ReservationsComponent } from './reservations.component';

export const routes: Routes = [
  {
    path: '',
    component: ReservationsComponent,
    children: [
      {
        path: '',
        component: ReservationListContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
