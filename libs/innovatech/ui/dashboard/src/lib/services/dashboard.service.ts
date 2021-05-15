import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuaranteeSummary, IvtQueryParams } from '@innovatech/common/domain';
import { buildQueryParams } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getGuaranteeSummary(queryParams?: IvtQueryParams): Observable<GuaranteeSummary> {
    const params = buildQueryParams(queryParams);
    return this.http.get<GuaranteeSummary>(`/ivtApi/guarantees/report/summary`, { params });
  }
}
