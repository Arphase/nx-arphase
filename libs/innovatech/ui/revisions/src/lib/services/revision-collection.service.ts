import { Injectable } from '@angular/core';
import { Revision } from '@innovatech/common/domain';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class RevisionCollectionService extends IvtCollectionService<Revision> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Revision', serviceElementsFactory);
  }
}
