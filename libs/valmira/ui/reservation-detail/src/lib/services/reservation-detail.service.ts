import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '@valmira/domain';
import { Observable } from 'rxjs';

import { SearchReservationPayload } from '../models/search-reservation-payload.model';

@Injectable({ providedIn: 'root' })
export class ReservationDetailService {
  constructor(private http: HttpClient) {}

  getReservationDetail(queryParams: SearchReservationPayload): Observable<Reservation> {
    return this.http.get<Reservation>(`/vmaApi/reservations/detail/search`, {
      params: new HttpParams({ fromObject: { ...queryParams, id: String(queryParams.id) } }),
    });
  }
}
