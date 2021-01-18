import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Vehicle } from '@ivt/c-data';
import { VehicleCollectionService } from '@ivt/u-state';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleResolverService implements Resolve<Vehicle> {
  constructor(private vehicleCollectionService: VehicleCollectionService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Vehicle> {
    const id = Number(route.paramMap.get('id'));
    let group$ = of(null);
    id ? (group$ = this.vehicleCollectionService.getByKey(id)) : this.vehicleCollectionService.removeOneFromCache(null);
    return group$;
  }
}
