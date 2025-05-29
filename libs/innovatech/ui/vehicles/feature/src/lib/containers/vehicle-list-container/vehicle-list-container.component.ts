import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Vehicle, VehicleStatus, vehicleStatusLabels } from '@innovatech/common/domain';
import { VehicleCollectionService, VehicleDataService } from '@innovatech/ui/vehicles/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ivt-vehicle-list-container',
  templateUrl: './vehicle-list-container.component.html',
  styleUrls: ['./vehicle-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VehicleListContainerComponent extends ApsListContainerComponent<Vehicle> {
  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected vehicleDataService: VehicleDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
    private router: Router,
  ) {
    super(vehicleCollectionService, vehicleDataService, modal, messageService);
  }

  deleteItem(item: Vehicle): void {
    const { model, year, vin } = item;
    this.deleteConfirmMessage = `¿Desea eliminar el vehículo ${model} ${year} con número de serie ${vin}? También se borrarán todas las revisiones y solicitudes de revisión asociadas a este vehículo.`;
    this.deleteSuccessMessage = `El vehículo ${model} ${year} con número de serie ${vin} ha sido eliminado`;
    super.deleteItem(item);
  }

  createGuarantee(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/guarantees/new?vehicleVin=${item.vin}`);
  }

  createRevision(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/revisions/new?vehicleVin=${item.vin}`);
  }

  createRevisionRequest(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/revision-requests/new?vehicleVin=${item.vin}`);
  }

  changeStatus(vehicle: Partial<Vehicle>): void {
    this.vehicleCollectionService
      .update(vehicle)
      .pipe(take(1))
      .subscribe(() =>
        this.messageService.success(
          `El vehículo con VIN ${vehicle.vin} ahora está en estatus: ${vehicleStatusLabels[
            VehicleStatus[vehicle.status]
          ].toLowerCase()}`,
        ),
      );
  }
}
