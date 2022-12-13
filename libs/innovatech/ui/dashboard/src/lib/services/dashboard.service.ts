import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildQueryParams } from '@arphase/ui/data';
import { GuaranteeSummary } from '@innovatech/common/domain';
import { QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getGuaranteeSummary(queryParams?: QueryParams): Observable<GuaranteeSummary> {
    const params = buildQueryParams(queryParams);
    return this.http.get<GuaranteeSummary>(`/ivtApi/guarantees/report/summary`, { params });
  }
}
