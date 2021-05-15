import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RevisionRequest } from '@innovatech/common/domain';
import { Observable, of } from 'rxjs';

import { RevisionRequestCollectionService } from '../services/revision-request-collection.service';

@Injectable({
  providedIn: 'root',
})
export class RevisionRequestResolverService implements Resolve<RevisionRequest> {
  constructor(private revisionRequestCollectionService: RevisionRequestCollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RevisionRequest> {
    const id = Number(route.paramMap.get('id'));
    let group$ = of(null);
    id
      ? (group$ = this.revisionRequestCollectionService.getByKey(id))
      : this.revisionRequestCollectionService.removeOneFromCache(null);
    return group$;
  }
}
