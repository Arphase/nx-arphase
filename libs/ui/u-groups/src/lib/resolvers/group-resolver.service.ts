import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Group } from '@ivt/c-data';
import { GroupCollectionService } from '@ivt/u-state';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService implements Resolve<Group> {
  constructor(private GroupCollectionService: GroupCollectionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Group> {
    const id = route.paramMap.get('id');
    let Group$ = of(null);
    id
      ? (Group$ = this.GroupCollectionService.getByKey(+id))
      : this.GroupCollectionService.removeOneFromCache(null);
    return Group$;
  }
}
