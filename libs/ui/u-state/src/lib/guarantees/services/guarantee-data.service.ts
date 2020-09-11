import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Guarantee, GuaranteeSummary } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '../../state-config';

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
    this.entitiesUrl = `${this.config.apiUrl}/guarantees`;
  }

  getGuaranteePdf(id: number): Observable<any> {
    return this.http
      .get(`${this.config.apiUrl}/guarantees/${id}/pdf`, {
        responseType: 'blob',
      })
      .pipe(
        tap((file) => {
          const blob = new Blob([file], { type: 'application/octet-stream' });
          saveAs(blob, `Garantía ${id}.pdf`);
        })
      );
  }

  getGuaranteeSummary(): Observable<GuaranteeSummary> {
    return this.http.get<GuaranteeSummary>(
      `${this.config.apiUrl}/guarantees/report/summary`
    );
  }
}
