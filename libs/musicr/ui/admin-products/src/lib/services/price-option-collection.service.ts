import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { PriceOption } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class PriceOptionCollectionService extends ApsCollectionService<PriceOption> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PriceOption', serviceElementsFactory);
  }
}
