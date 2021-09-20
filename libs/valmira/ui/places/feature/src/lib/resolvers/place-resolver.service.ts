import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Place } from '@valmira/domain';
import { PlaceCollectionService } from '@valmira/ui/places/data';

@Injectable({ providedIn: 'root' })
export class PlaceResolverService extends ApsEntityResolverService<Place> {
  constructor(protected placeCollectionService: PlaceCollectionService) {
    super(placeCollectionService);
  }
}
