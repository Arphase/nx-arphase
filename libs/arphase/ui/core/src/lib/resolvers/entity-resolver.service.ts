import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApsCollectionService } from '@arphase/ui/data';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApsEntityResolverService<T> implements Resolve<T> {
  constructor(protected collectionService: ApsCollectionService<T>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<T> {
    const id = Number(route.paramMap.get('id'));
    let entity$: Observable<T> = of(null);
    id ? (entity$ = this.collectionService.getByKey(id)) : this.collectionService.removeOneFromCache(null);
    return entity$;
  }
}
