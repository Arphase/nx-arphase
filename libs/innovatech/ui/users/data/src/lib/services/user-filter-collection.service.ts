import { Injectable } from '@angular/core';
import { ApsCollectionService, filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@arphase/ui';
import { User } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class UserFilterCollectionService extends ApsCollectionService<User> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(user => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id,
    })),
    sortSelectOptionsAlphabetical()
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserFilter', serviceElementsFactory);
  }
}
