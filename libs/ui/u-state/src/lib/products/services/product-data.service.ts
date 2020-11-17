import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { IvtDataService } from '../../core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '../../state-config';
import showdown from 'showdown';

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

  getTemplatePreview(text: string): Observable<any> {
    var converter = new showdown.Converter()
    var html = converter.makeHtml(text)
  
    // return this.http.get(`${this.config.apiUrl}/products/preview/pdf/${html}`, { responseType: 'blob', })
    return this.http.post<any>(`${this.config.apiUrl}/products/preview/pdf`, {template: html}, { responseType: 'blob' as "json" })
      .pipe(tap((file: Blob) => saveFile(file, `ProductPreview.pdf`)));
  }
}
