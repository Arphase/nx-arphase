import { Injectable } from '@angular/core';
import { Group } from '@innovatech/common/domain';
import { filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@innovatech/common/utils';
import { IvtCollectionService } from '@ivt/u-state';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class GroupCollectionService extends IvtCollectionService<Group> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Group', serviceElementsFactory);
  }
}
