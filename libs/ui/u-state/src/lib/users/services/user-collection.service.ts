import { Injectable } from '@angular/core';
import { User } from '@ivt/c-data';
import { filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@ivt/c-utils';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class UserCollectionService extends IvtCollectionService<User> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(user => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id,
    })),
    sortSelectOptionsAlphabetical()
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}
