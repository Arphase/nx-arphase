import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Reservation } from '@valmira/domain';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { SearchReservationPayload } from '../models/search-reservation-payload.model';
import { getReservationDetail, getReservationDetailSuccess } from '../state/reservation-detail.actions';

@Injectable({
  providedIn: 'root',
})
export class ReservationDetailResolverService implements Resolve<Reservation> {
  constructor(private store: Store, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Reservation> {
    const id = Number(route.paramMap.get('id'));
    const email = route.queryParamMap.get('email');
    const payload: SearchReservationPayload = { id, email };

    this.store.dispatch(getReservationDetail({ payload }));

    return this.actions$.pipe(
      ofType(getReservationDetailSuccess),
      take(1),
      map(({ reservation }) => reservation)
    );
  }
}
