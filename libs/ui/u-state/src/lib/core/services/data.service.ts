import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { IvtQueryParams } from '@ivt/c-data';
import { saveFile } from '@ivt/c-utils';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { buildQueryParams } from '../../entities/build-query-params';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';

export class IvtDataService<T = any> extends DefaultDataService<T> {
  private loadingExcelSubject = new BehaviorSubject<boolean>(false);
  loadingExcel$ = this.loadingExcelSubject.asObservable();

  constructor(
    protected entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration
  ) {
    super(entityName, http, httpUrlGenerator);
  }

  getWithQuery(queryParams: string | QueryParams): Observable<T[]> {
    return super.getWithQuery(buildQueryParams(queryParams as any).toString());
  }

  exportExcel(payload: { params: IvtQueryParams; fileName: string; url: string }): Observable<Blob> {
    const { url, params, fileName } = payload;
    this.loadingExcelSubject.next(true);
    return this.http
      .get(url, {
        responseType: 'blob',
        params,
      })
      .pipe(
        tap((file: Blob) => saveFile(file, `${fileName}${moment(new Date()).format('DD-MM-YYYY')}.xlsx`)),
        finalize(() => this.loadingExcelSubject.next(false))
      );
  }

  getEntitiesUrl(): string {
    return this.entitiesUrl;
  }

  getEntityUrl(): string {
    return this.entityUrl;
  }
}
