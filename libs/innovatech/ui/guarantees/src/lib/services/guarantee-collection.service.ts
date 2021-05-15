import { Injectable } from '@angular/core';
import { Guarantee } from '@innovatech/common/domain';
import { IvtCollectionService } from '@ivt/u-state';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeCollectionService extends IvtCollectionService<Guarantee> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Guarantee', serviceElementsFactory);
  }
}
