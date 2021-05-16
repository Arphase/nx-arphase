import { Injectable } from '@angular/core';
import { RevisionRequest } from '@innovatech/common/domain';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class RevisionRequestCollectionService extends IvtCollectionService<RevisionRequest> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('RevisionRequest', serviceElementsFactory);
  }
}
