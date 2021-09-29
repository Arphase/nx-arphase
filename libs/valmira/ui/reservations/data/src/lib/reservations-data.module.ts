import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { ReservationDataService } from './services/reservation-data.service';

@NgModule({})
export class ReservationsDataModule {
  constructor(entityDataService: EntityDataService, reservationDataService: ReservationDataService) {
    entityDataService.registerService('Reservation', reservationDataService);
  }
}
