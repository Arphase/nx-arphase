import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Reservation } from '@valmira/domain';

import { ReservationCollectionService } from '../services/reservation-collection.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationResolverService extends ApsEntityResolverService<Reservation> {
  constructor(protected reservationCollectionService: ReservationCollectionService) {
    super(reservationCollectionService);
  }
}
