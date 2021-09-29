import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReservationCardModule } from '@valmira/ui/reservations/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';

import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { ReservationSearchComponent } from './components/reservation-search/reservation-search.component';
import { ReservationDetailContainerComponent } from './containers/reservation-detail-container/reservation-detail-container.component';
import { ReservationSearchContainerComponent } from './containers/reservation-search-container/reservation-search-container.component';
import { ReservationDetailRoutingModule } from './reservation-detail-routing.module';
import { ReservationDetailEffects } from './state/reservation-detail.effects';
import { reducer } from './state/reservation-detail.reducer';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ReservationDetailEffects]),
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    ReservationCardModule,
    ReservationDetailRoutingModule,
    StoreModule.forFeature('reservationDetail', reducer),
  ],
  declarations: [
    ReservationSearchContainerComponent,
    ReservationSearchComponent,
    ReservationDetailComponent,
    ReservationDetailContainerComponent,
  ],
})
export class ReservationDetailModule {}
