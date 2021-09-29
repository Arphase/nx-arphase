import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '@valmira/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceDetailService {
  constructor(private http: HttpClient) {}

  getReservationPreview(reservation: Partial<Reservation>): Observable<Reservation> {
    return this.http.post<Reservation>(`/vmaApi/reservations/preview`, reservation);
  }
}
