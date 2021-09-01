import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Promocode } from '@valmira/domain';

@Injectable({
  providedIn: 'root'
})
export class PromocodeCollectionService extends ApsCollectionService<Promocode> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Promocode', serviceElementsFactory);
  }
}
