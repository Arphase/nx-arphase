import { Injectable } from '@angular/core';
import { Guarantee } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeCollectionService extends IvtCollectionService<Guarantee> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Guarantee', serviceElementsFactory);
  }
}
