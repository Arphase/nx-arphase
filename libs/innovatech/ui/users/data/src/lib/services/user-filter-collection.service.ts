import { Injectable } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { filterNilArray, mapToSelectOptions, sortSelectOptionsAlphabetical } from '@innovatech/common/utils';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class UserFilterCollectionService extends IvtCollectionService<User> {
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