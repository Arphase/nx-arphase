import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService, buildQueryParams } from '@arphase/ui/core';
import { HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Place, PlaceCategorySummary } from '@valmira/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaceDataService extends ApsDataService<Place> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Place', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/places/`;
    this.entitiesUrl = `/vmaApi/places`;
  }

  getOccupiedDates(id: number, dateType: string): Observable<Date[]> {
    const params = new HttpParams({ fromObject: { dateType } });
    return this.http.get<Date[]>(`/vmaApi/places/${id}/occupied-dates`, { params });
  }

  getCategorySummary(queryParams: QueryParams): Observable<PlaceCategorySummary> {
    const params = buildQueryParams(queryParams);
    return this.http.get<PlaceCategorySummary>(`/vmaApi/places/count/category`, { params });
  }
}
