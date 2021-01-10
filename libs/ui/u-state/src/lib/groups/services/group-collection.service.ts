import { Injectable } from '@angular/core';
import { Group } from '@ivt/c-data';
import { filterNilArray, mapToSelectOptions } from '@ivt/c-utils';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class GroupCollectionService extends IvtCollectionService<Group> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(group => ({
      label: `${group.name}`,
      value: group.id,
    }))
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Group', serviceElementsFactory);
  }
}
