import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui';
import { Group } from '@innovatech/common/domain';
import { filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@innovatech/common/utils';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class GroupFilterCollectionService extends ApsCollectionService<Group> {
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
