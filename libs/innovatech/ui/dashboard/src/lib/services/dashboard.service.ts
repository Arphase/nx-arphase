import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsQueryParams } from '@arphase/common';
import { buildQueryParams } from '@arphase/ui/data';
import { GuaranteeSummary } from '@innovatech/common/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getGuaranteeSummary(queryParams?: ApsQueryParams): Observable<GuaranteeSummary> {
    const params = buildQueryParams(queryParams);
    return this.http.get<GuaranteeSummary>(`/ivtApi/guarantees/report/summary`, { params });
  }
}
