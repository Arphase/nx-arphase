import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles, Vehicle, VehicleStatus } from '@innovatech/common/domain';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { VehicleCollectionService, VehicleDataService } from '@innovatech/ui/vehicles/data';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';

import { statusLabels } from '../../components/vehicle-list/vehicle-list.constants';

@Component({
  selector: 'ivt-vehicle-list-container',
  templateUrl: './vehicle-list-container.component.html',
  styleUrls: ['./vehicle-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListContainerComponent extends IvtListContainerComponent<Vehicle> {
  canCreateReviewRequest$ = this.permissionsService.hasUpdatePermission([UserRoles.agencyUser]);
  canManageRevisions$ = this.permissionsService.hasUpdatePermission([UserRoles.superAdmin]);

  constructor(
    protected vehicleCollectionService: VehicleCollectionService,
    protected vehicleDataService: VehicleDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
    protected router: Router,
    protected permissionsService: PermissionService
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
    this.router.navigateByUrl(`/spa/guarantees/new?vehicleId=${item.id}`);
  }

  createRevision(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/revisions/new?vehicleId=${item.id}`);
  }

  createRevisionRequest(item: Vehicle): void {
    this.router.navigateByUrl(`/spa/revision-requests/new?vehicleId=${item.id}`);
  }

  changeStatus(vehicle: Partial<Vehicle>): void {
    this.vehicleCollectionService
      .update(vehicle)
      .pipe(take(1))
      .subscribe(() =>
        this.messageService.success(
          `El vehículo con VIN ${vehicle.vin} ahora está en estatus: ${statusLabels[
            VehicleStatus[VehicleStatus[vehicle.status]]
          ].toLowerCase()}`
        )
      );
  }
}
