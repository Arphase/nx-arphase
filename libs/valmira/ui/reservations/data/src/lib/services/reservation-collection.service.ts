import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Reservation } from '@valmira/domain';

@Injectable({ providedIn: 'root' })
export class ReservationCollectionService extends ApsCollectionService<Reservation> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Reservation', serviceElementsFactory);
  }
}
