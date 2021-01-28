import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentOrder } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderDataService extends IvtDataService<PaymentOrder> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('PaymentOrder', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/payment-orders/`;
    this.entitiesUrl = `/ivtApi/payment-orders`;
  }

  getPaymentOrderPdf(id: number): Observable<Blob> {
    return this.http
      .get(`/ivtApi/payment-orders/${id}/pdf`, {
        responseType: 'blob',
      })
      .pipe(
        tap(file => {
          const blob = new Blob([file], { type: 'application/octet-stream' });
          saveAs(blob, `Orden de pago ${id}.pdf`);
        })
      );
  }
}
