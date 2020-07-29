import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  IVT_STATE_CONFIGURATION,
  IvtStateConfiguration,
} from '../../state-config';

@Injectable({
  providedIn: 'root',
})
export class GuaranteesService {
  constructor(
    private http: HttpClient,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {}

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
