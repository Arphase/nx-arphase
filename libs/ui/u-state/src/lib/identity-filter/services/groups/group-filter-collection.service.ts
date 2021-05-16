import { Injectable } from '@angular/core';
import { Group } from '@innovatech/common/domain';
import { filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@innovatech/common/utils';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class GroupFilterCollectionService extends IvtCollectionService<Group> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(group => ({
      label: `${group.name}`,
      value: group.id,
    })),
    sortSelectOptionsAlphabetical()
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('GroupFilter', serviceElementsFactory);
  }
}
