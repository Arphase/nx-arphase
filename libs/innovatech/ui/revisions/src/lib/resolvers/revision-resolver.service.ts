import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Revision } from '@innovatech/common/domain';
import { Observable, of } from 'rxjs';

import { RevisionCollectionService } from '../services/revision-collection.service';

@Injectable({
  providedIn: 'root',
})
export class RevisionResolverService implements Resolve<Revision> {
  constructor(private revisionCollectionService: RevisionCollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Revision> {
    const id = Number(route.paramMap.get('revisionId'));
    let revision$ = of(null);
    id
      ? (revision$ = this.revisionCollectionService.getByKey(id))
      : this.revisionCollectionService.removeOneFromCache(null);
    return revision$;
  }
}
