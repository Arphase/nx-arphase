import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Vehicle } from '@ivt/c-data';
import { VehicleCollectionService, VehicleDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-vehicle-list-container',
  templateUrl: './vehicle-list-container.component.html',
  styleUrls: ['./vehicle-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListContainerComponent extends IvtListContainerComponent<Vehicle> {
  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected vehicleDataService: VehicleDataService
  ) {
    super(vehicleCollectionService, vehicleDataService);
  }
}
