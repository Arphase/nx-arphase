import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { User } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class UserCollectionService extends ApsCollectionService<User> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}
