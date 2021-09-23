import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, Promocode, Reservation } from '@valmira/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationWizardService {
  constructor(private http: HttpClient) {}

  getCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(`/vmaApi/customers/search/email`, {
      params: new HttpParams({ fromObject: { email } }),
    });
  }

  getPromocodeByName(name: string): Observable<Promocode> {
    return this.http.get<Promocode>(`/vmaApi/promocodes/search/name`, {
      params: new HttpParams({ fromObject: { name } }),
    });
  }

  updateReservation(reservation: Partial<Reservation>): Observable<Reservation> {
    return this.http.put<Reservation>(`/vmaApi/reservations/${reservation.id}`, reservation);
  }
}
