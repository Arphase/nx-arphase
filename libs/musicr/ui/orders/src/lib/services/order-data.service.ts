import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService, saveFile } from '@arphase/ui/core';
import { Order } from '@musicr/domain';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderDataService extends ApsDataService<Order> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Order', http, httpUrlGenerator);
    this.entityUrl = `/mrlApi/orders/`;
    this.entitiesUrl = `/mrlApi/orders`;
  }

  gerOrderPdf(id: number): Observable<Blob> {
    const params = new HttpParams({ fromObject: { utcOffset: -new Date().getTimezoneOffset() } });
    return this.http
      .get(`/mrlApi/orders/export/pdf/${id}`, { params, responseType: 'blob' })
      .pipe(tap((file: Blob) => saveFile(file, `Orden ${id}.pdf`)));
  }
}
