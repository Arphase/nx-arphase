import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { AdditionalOption } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class AdditionalOptionCollectionService extends ApsCollectionService<AdditionalOption> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AdditionalOption', serviceElementsFactory);
  }
}
