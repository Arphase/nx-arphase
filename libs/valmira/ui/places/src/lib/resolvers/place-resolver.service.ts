import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui';
import { Place } from '@valmira/domain';

import { PlaceCollectionService } from '../services/place-collection.service';

@Injectable({
  providedIn: 'root',
})
export class PlaceResolverService extends ApsEntityResolverService<Place> {
  constructor(protected placeCollectionService: PlaceCollectionService) {
    super(placeCollectionService);
  }
}
