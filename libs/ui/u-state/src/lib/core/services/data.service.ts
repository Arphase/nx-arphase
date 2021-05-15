import { HttpClient, HttpParams } from '@angular/common/http';
import { Optional } from '@angular/core';
import { saveFile } from '@innovatech/common/utils';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { buildQueryParams } from '../../entities/build-query-params';

export class IvtDataService<T> extends DefaultDataService<T> {
  private loadingExcelSubject = new BehaviorSubject<boolean>(false);
  loadingExcel$ = this.loadingExcelSubject.asObservable();

  constructor(
    @Optional() public entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator
  ) {
    super(entityName, http, httpUrlGenerator);
  }

  getWithQuery(queryParams: QueryParams): Observable<T[]> {
    return super.getWithQuery(buildQueryParams(queryParams).toString());
  }

  exportExcel(payload: { params: HttpParams; fileName: string; url: string }): Observable<Blob> {
    const { url, params, fileName } = payload;
    this.loadingExcelSubject.next(true);
    return this.http
      .get(url, {
        responseType: 'blob',
        params,
      })
      .pipe(
        tap((file: Blob) => saveFile(file, `${fileName}${dayjs(new Date()).format('DD-MM-YYYY')}.xlsx`)),
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
