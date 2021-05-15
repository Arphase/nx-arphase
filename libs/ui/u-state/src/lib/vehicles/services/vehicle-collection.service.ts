import { Injectable } from '@angular/core';
import { Vehicle } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class VehicleCollectionService extends IvtCollectionService<Vehicle> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Vehicle', serviceElementsFactory);
  }
}
