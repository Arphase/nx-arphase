import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IvtQueryParams, Revision } from '@ivt/c-data';
import { RevisionCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RevisionsResolverService implements Resolve<Revision[]> {
  constructor(private revisionCollectionService: RevisionCollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Revision[]> {
    const vehicleId = route.paramMap.get('id');
    const queryParams: IvtQueryParams = { resetList: String(true), vehicleId };
    if (!vehicleId) {
      localStorage.removeItem('currentVehicleName');
    }
    return this.revisionCollectionService.getWithQuery(queryParams);
  }
}
