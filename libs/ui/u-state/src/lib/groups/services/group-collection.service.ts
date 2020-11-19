import { Injectable } from '@angular/core';
import { Group } from '@ivt/c-data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class GroupCollectionService extends IvtCollectionService<
  Group
> {
  constructor(
    protected serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Group', serviceElementsFactory);
  }
}
