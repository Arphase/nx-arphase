import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApsDataService } from '@arphase/ui';
import { HttpUrlGenerator } from '@ngrx/data';
import { Place } from '@valmira/domain';

@Injectable({ providedIn: 'root' })
export class PlaceDataService extends ApsDataService<Place> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Place', http, httpUrlGenerator);
    this.entityUrl = `/vmaApi/places/`;
    this.entitiesUrl = `/vmaApi/places`;
  }
}
