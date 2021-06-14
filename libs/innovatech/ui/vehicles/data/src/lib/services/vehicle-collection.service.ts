import { Injectable } from '@angular/core';
import { Vehicle } from '@innovatech/common/domain';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class VehicleCollectionService extends IvtCollectionService<Vehicle> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Vehicle', serviceElementsFactory);
  }
}
