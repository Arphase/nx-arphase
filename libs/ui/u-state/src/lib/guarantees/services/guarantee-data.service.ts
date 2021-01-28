import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guarantee, GuaranteeSummary, IvtQueryParams } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IvtDataService } from '../../core';
import { buildQueryParams } from '../../entities';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeDataService extends IvtDataService<Guarantee> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Guarantee', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/guarantees/`;
    this.entitiesUrl = `/ivtApi/guarantees`;
  }

  getGuaranteePdf(id: number): Observable<Blob> {
    return this.http
      .get(`/ivtApi/guarantees/export/pdf/${id}`, {
        responseType: 'blob',
      })
      .pipe(tap((file: Blob) => saveFile(file, `Garantía ${id}.pdf`)));
  }

  getGuaranteeSummary(queryParams?: IvtQueryParams): Observable<GuaranteeSummary> {
    const params = buildQueryParams(queryParams);
    return this.http.get<GuaranteeSummary>(`/ivtApi/guarantees/report/summary`, { params });
  }
}
