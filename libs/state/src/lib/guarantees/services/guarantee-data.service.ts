import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Guarantee } from '@ivt/data';
import { HttpUrlGenerator } from '@ngrx/data';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import {
  IVT_STATE_CONFIGURATION,
  IvtStateConfiguration,
} from '../../state-config';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeDataService extends IvtDataService<Guarantee> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {
    super('Guarantee', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/guarantees/`;
    this.entitiesUrl = `${this.config.apiUrl}/guarantees/`;
  }

  getGuaranteePdf(payload): Observable<any> {
    return this.http
      .post(`${this.config.apiUrl}/guarantees`, payload, {
        responseType: 'blob',
      })
      .pipe(
        tap((file) => {
          const blob = new Blob([file], { type: 'application/octet-stream' });
          saveAs(blob, 'Garantia.pdf');
        })
      );
  }
}
