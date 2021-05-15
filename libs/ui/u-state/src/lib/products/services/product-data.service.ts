import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@innovatech/common/domain';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService extends IvtDataService<Product> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Product', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/products/`;
    this.entitiesUrl = `/ivtApi/products`;
  }

  getTemplatePreview(text: string, logo: string): Observable<Blob> {
    return this.http
      .post(`/ivtApi/products/preview/pdf`, { template: text, logo: logo }, { responseType: 'blob' as 'json' })
      .pipe(tap((file: Blob) => saveFile(file, `ProductPreview.pdf`)));
  }
}
