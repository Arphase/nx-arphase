import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { AdditionalProduct } from '@valmira/domain';

@Injectable({ providedIn: 'root' })
export class AdditionalProductCollectionService extends ApsCollectionService<AdditionalProduct> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AdditionalProduct', serviceElementsFactory);
  }
}
