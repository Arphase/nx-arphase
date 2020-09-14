import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PaymentOrder } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '../../state-config';

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderDataService extends IvtDataService<PaymentOrder> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {
    super('PaymentOrder', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/paymentOrders/`;
    this.entitiesUrl = `${this.config.apiUrl}/paymentOrders`;
  }

  getPaymentOrderPdf(id: number): Observable<any> {
    return this.http
      .get(`${this.config.apiUrl}/paymentOrders/${id}/pdf`, {
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
