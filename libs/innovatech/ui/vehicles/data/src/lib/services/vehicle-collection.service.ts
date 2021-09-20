import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { Vehicle } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class VehicleCollectionService extends ApsCollectionService<Vehicle> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Vehicle', serviceElementsFactory);
  }
}
