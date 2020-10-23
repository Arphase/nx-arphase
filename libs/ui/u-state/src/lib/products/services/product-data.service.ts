import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product, ProductSummary } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '../../state-config';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService extends IvtDataService<Product> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {
    super('Product', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/products/`;
    this.entitiesUrl = `${this.config.apiUrl}/products`;
  }

  getProductPdf(id: number): Observable<any> {
    return this.http
      .get(`${this.config.apiUrl}/products/export/pdf/${id}`, {
        responseType: 'blob',
      })
      .pipe(tap((file: Blob) => saveFile(file, `Producto ${id}.pdf`)));
  }

  getProductSummary(): Observable<ProductSummary> {
    return this.http.get<ProductSummary>(`${this.config.apiUrl}/products/report/summary`);
  }
}
