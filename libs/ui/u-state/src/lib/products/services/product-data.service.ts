import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import showdown from 'showdown';

import { IvtDataService } from '../../core';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService extends IvtDataService<Product> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration
  ) {
    super('Product', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/products/`;
    this.entitiesUrl = `${this.config.apiUrl}/products`;
  }

  getTemplatePreview(text: string, logo: string): Observable<any> {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);

    return this.http
      .post<any>(
        `${this.config.apiUrl}/products/preview/pdf`,
        { template: html, logo: logo },
        { responseType: 'blob' as 'json' }
      )
      .pipe(tap((file: Blob) => saveFile(file, `ProductPreview.pdf`)));
  }
}
