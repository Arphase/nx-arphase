import { Injectable } from '@angular/core';
import { Revision } from '@ivt/c-data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class RevisionCollectionService extends IvtCollectionService<Revision> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Revision', serviceElementsFactory);
  }
}
