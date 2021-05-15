import { Injectable } from '@angular/core';
import { RevisionRequest } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class RevisionRequestCollectionService extends IvtCollectionService<RevisionRequest> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('RevisionRequest', serviceElementsFactory);
  }
}
