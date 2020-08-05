import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';

import { buildQueryParams } from '../../entities/build-query-params';
import {
  IVT_STATE_CONFIGURATION,
  IvtStateConfiguration,
} from '../../state-config';

export class IvtDataService<T = any> extends DefaultDataService<T> {
  constructor(
    protected entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {
    super(entityName, http, httpUrlGenerator);
  }

  getWithQuery(queryParams: string | QueryParams): Observable<T[]> {
    return super.getWithQuery(buildQueryParams(queryParams as any).toString());
  }
}
