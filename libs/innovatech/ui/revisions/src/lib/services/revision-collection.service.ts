import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { Revision } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class RevisionCollectionService extends ApsCollectionService<Revision> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Revision', serviceElementsFactory);
  }
}
