import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '@ivt/c-data';
import { HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService extends IvtDataService<Vehicle> {
  constructor(protected http: HttpClient, protected httpUrlGenerator: HttpUrlGenerator) {
    super('Vehicle', http, httpUrlGenerator);
    this.entityUrl = `/ivtApi/vehicles/`;
    this.entitiesUrl = `/ivtApi/vehicles`;
  }
}
