import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui';
import { Vehicle } from '@innovatech/common/domain';
import { VehicleCollectionService } from '@innovatech/ui/vehicles/data';

@Injectable({ providedIn: 'root' })
export class VehicleResolverService extends ApsEntityResolverService<Vehicle> {
  constructor(protected vehicleCollectionService: VehicleCollectionService) {
    super(vehicleCollectionService);
  }
}
