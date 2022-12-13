import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { RevisionRequest } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class RevisionRequestCollectionService extends ApsCollectionService<RevisionRequest> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('RevisionRequest', serviceElementsFactory);
  }
}
