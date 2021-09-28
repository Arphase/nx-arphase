import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationDetailContainerComponent } from './containers/reservation-detail-container/reservation-detail-container.component';
import { ReservationSearchContainerComponent } from './containers/reservation-search-container/reservation-search-container.component';
import { ReservationDetailResolverService } from './resolvers/reservation-detail-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ReservationSearchContainerComponent,
  },
  {
    path: ':id',
    component: ReservationDetailContainerComponent,
    resolve: { resolvedReservation: ReservationDetailResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationDetailRoutingModule {}
