import { Injectable } from '@angular/core';
import { filterNil } from '@innovatech/common/utils';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IvtEntityCollection } from '../entity-config/entity-collection-reducer-methods';

@Injectable()
export abstract class IvtCollectionService<T> extends EntityCollectionServiceBase<T> {
  options$: Observable<NzSelectOptionInterface[]>;
  currentItem$ = this.selectors$.collection$.pipe(map((collection: IvtEntityCollection<T>) => collection.currentItem));
  loadingModify$ = this.selectors$.collection$.pipe(
    map((collection: IvtEntityCollection<T>) => collection.loadingModify)
  );
  info$ = this.selectors$.collection$.pipe(map((collection: IvtEntityCollection<T>) => collection.info));
  pageIndex$ = this.info$.pipe(
    filterNil(),
    map(info => info.pageIndex)
  );
  last$ = this.info$.pipe(
    filterNil(),
    map(info => info.last)
  );
  queryParams$ = this.selectors$.collection$.pipe(map((collection: IvtEntityCollection<T>) => collection.queryParams));

  constructor(public entityName: string, protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(entityName, serviceElementsFactory);
  }
}
