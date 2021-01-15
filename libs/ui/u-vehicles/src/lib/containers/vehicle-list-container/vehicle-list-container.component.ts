import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    protected vehicleDataService: VehicleDataService,
    protected dialog: MatDialog
  ) {
    super(vehicleCollectionService, vehicleDataService);
  }

  deleteItem(item: Vehicle): void {
    const { model, year, vin } = item;
    this.deleteConfirmMessage = `¿Desea eliminar el vehículo ${model} ${year} con número de serie ${vin}?`;
    super.deleteItem(item);
  }
}
