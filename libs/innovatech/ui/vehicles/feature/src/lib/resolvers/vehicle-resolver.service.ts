import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Vehicle } from '@innovatech/common/domain';
import { VehicleCollectionService } from '@innovatech/ui/vehicles/data';
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
