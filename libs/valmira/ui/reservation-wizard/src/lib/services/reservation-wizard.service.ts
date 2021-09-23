import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@valmira/domain';
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
}
