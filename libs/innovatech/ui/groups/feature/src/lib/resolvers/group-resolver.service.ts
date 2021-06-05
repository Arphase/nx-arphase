import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Group } from '@innovatech/common/domain';
import { GroupCollectionService } from '@innovatech/ui/groups/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService implements Resolve<Group> {
  constructor(private groupCollectionService: GroupCollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Group> {
    const id = Number(route.paramMap.get('id'));
    let group$: Observable<Group | null> = of(null);
    id ? (group$ = this.groupCollectionService.getByKey(id)) : this.groupCollectionService.removeOneFromCache(null);
    return group$;
  }
}
