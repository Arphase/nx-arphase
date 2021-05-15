import { Injectable } from '@angular/core';
import { Revision } from '@innovatech/common/domain';
import { IvtCollectionService } from '@ivt/u-state';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class RevisionCollectionService extends IvtCollectionService<Revision> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Revision', serviceElementsFactory);
  }
}
