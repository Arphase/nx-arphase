import { Injectable } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class UserCollectionService extends IvtCollectionService<User> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}