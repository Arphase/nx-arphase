import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { HttpUrlGenerator } from '@ngrx/data';
import { Reservation } from '@valmira/domain';

@Injectable({ providedIn: 'root' })
export class ReservationDataService extends ApsDataService<Reservation> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Reservation', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/reservations/`;
    this.entitiesUrl = `/vmaApi/reservations`;
  }
}
