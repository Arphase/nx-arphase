import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Group } from '@ivt/c-data';
import { GroupCollectionService } from '@ivt/u-state';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService implements Resolve<Group> {
  constructor(private groupCollectionService: GroupCollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Group> {
    const id = Number(route.paramMap.get('id'));
    let group$ = of(null);
    id ? (group$ = this.groupCollectionService.getByKey(id)) : this.groupCollectionService.removeOneFromCache(null);
    return group$;
  }
}
