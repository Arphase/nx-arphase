import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui';
import { Guarantee } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class GuaranteeCollectionService extends ApsCollectionService<Guarantee> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Guarantee', serviceElementsFactory);
  }
}
