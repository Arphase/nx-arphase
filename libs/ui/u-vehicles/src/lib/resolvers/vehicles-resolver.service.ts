import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IvtQueryParams, Vehicle } from '@ivt/c-data';
import { VehicleCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesResolverService implements Resolve<Vehicle[]> {
  constructor(private vehicleCollectionService: VehicleCollectionService) {}

  resolve(): Observable<Vehicle[]> {
    const queryParams: IvtQueryParams = { resetList: String(true) };
    return this.vehicleCollectionService.getWithQuery(queryParams);
  }
}
