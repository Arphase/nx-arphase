import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '@innovatech/common/domain';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';

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

  getVehicleByVin(vin: string): Observable<Vehicle | null> {
    return this.http.get<Vehicle | null>(`/ivtApi/vehicles/vin/${vin}`, {
      headers: new HttpHeaders({ noMessage: 'true' }),
    });
  }
}
