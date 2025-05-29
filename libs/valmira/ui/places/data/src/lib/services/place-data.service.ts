import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui/data';
import { HttpUrlGenerator } from '@ngrx/data';
import { Place } from '@valmira/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaceDataService extends ApsDataService<Place> {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Place', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/places/`;
    this.entitiesUrl = `/vmaApi/places`;
  }

  getOccupiedDates(id: number, dateType: string): Observable<Date[]> {
    const params = new HttpParams({ fromObject: { dateType } });
    return this.http.get<Date[]>(`/vmaApi/places/${id}/occupied-dates`, { params });
  }
}
