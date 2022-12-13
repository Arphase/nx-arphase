import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Place } from '@valmira/domain';

@Injectable({ providedIn: 'root' })
export class PlaceCollectionService extends ApsCollectionService<Place> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Place', serviceElementsFactory);
  }
}
