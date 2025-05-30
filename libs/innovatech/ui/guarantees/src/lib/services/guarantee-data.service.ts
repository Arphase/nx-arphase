import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { saveFile } from '@arphase/ui/utils';
import { Guarantee } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuaranteeDataService extends ApsDataService<Guarantee> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Guarantee', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/guarantees/`;
    this.entitiesUrl = `/ivtApi/guarantees`;
  }

  getGuaranteePdf(id: number): Observable<Blob> {
    const params = new HttpParams({ fromObject: { utcOffset: -new Date().getTimezoneOffset() } });
    return this.http
      .get(`/ivtApi/guarantees/export/pdf/${id}`, { responseType: 'blob', params })
      .pipe(tap((file: Blob) => saveFile(file, `Garantía ${id}.pdf`)));
  }
}
