import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map } from 'rxjs/operators';

import { IvtEntityCollection } from '../../entities';

@Injectable({
  providedIn: 'root',
})
export class IvtCollectionService<T> extends EntityCollectionServiceBase<T> {
  currentItem$ = this.selectors$.collection$.pipe(map((collection: IvtEntityCollection<T>) => collection.currentItem));
  loadingModify$ = this.selectors$.collection$.pipe(
    map((collection: IvtEntityCollection<T>) => collection.loadingModify)
  );

  constructor(public entityName: string, protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(entityName, serviceElementsFactory);
  }
}
