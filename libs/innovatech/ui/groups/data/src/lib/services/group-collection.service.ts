import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { Group } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class GroupCollectionService extends ApsCollectionService<Group> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Group', serviceElementsFactory);
  }
}
