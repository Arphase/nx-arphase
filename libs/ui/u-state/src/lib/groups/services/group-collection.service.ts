import { Injectable } from '@angular/core';
import { Group } from '@ivt/c-data';
import { filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@ivt/c-utils';
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
    })),
    sortSelectOptionsAlphabetical()
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Group', serviceElementsFactory);
  }
}
