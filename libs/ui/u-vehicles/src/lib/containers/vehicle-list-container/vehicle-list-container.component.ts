import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Vehicle } from '@ivt/c-data';
import { VehicleCollectionService, VehicleDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';

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
    protected dialog: MatDialog,
    protected toastr: ToastrService,
    protected router: Router
  ) {
    super(vehicleCollectionService, vehicleDataService, dialog, toastr);
  }

  deleteItem(item: Vehicle): void {
    const { model, year, vin } = item;
    this.deleteConfirmMessage = `¿Desea eliminar el vehículo ${model} ${year} con número de serie ${vin}?`;
    this.deleteSuccessMessage = `El vehículo ${model} ${year} con número de serie ${vin} ha sido eliminado`;
    super.deleteItem(item);
  }

  goToRevisions(item: Vehicle): void {
    const { id, model, year } = item;
    localStorage.setItem('currentVehicleName', `${model} ${year}`);
    this.router.navigateByUrl(`spa/vehicles/${id}/revisions`);
  }
}
