import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Guarantee, GuaranteeSummary, IvtQueryParams } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import { buildQueryParams } from '../../entities';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeDataService extends IvtDataService<Guarantee> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration
  ) {
    super('Guarantee', http, httpUrlGenerator, config);
    this.entityUrl = `${this.config.apiUrl}/guarantees/`;
    this.entitiesUrl = `${this.config.apiUrl}/guarantees`;
  }

  getGuaranteePdf(id: number): Observable<Blob> {
    return this.http
      .get(`${this.config.apiUrl}/guarantees/export/pdf/${id}`, {
        responseType: 'blob',
      })
      .pipe(tap((file: Blob) => saveFile(file, `Garantía ${id}.pdf`)));
  }

  getGuaranteeSummary(queryParams?: IvtQueryParams): Observable<GuaranteeSummary> {
    const params = buildQueryParams(queryParams);
    return this.http.get<GuaranteeSummary>(`${this.config.apiUrl}/guarantees/report/summary`, { params });
  }
}
