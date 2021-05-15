import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isVehicleElegible, UserRoles, Vehicle, VehicleStatus } from '@innovatech/common/domain';
import { REQUIRED_ROLES } from '@ivt/u-state';
import { IvtListComponent } from '@ivt/u-ui';

import { colorMaps, columns, iconMaps, statusLabels, statusOptions } from './vehicle-list.constants';

@Component({
  selector: 'ivt-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class VehicleListComponent extends IvtListComponent<Vehicle> {
  @Input() canCreateReviewRequest: boolean;
  @Input() canManageRevisions: boolean;
  columns = columns;
  vehicleStatus = VehicleStatus;
  colorMaps = colorMaps;
  iconMaps = iconMaps;
  statusLabels = statusLabels;
  statusOptions = statusOptions;
  @Output() createGuarantee = new EventEmitter<Vehicle>();
  @Output() createRevision = new EventEmitter<Vehicle>();
  @Output() createRevisionRequest = new EventEmitter<Vehicle>();

  isElegible(vehicle: Vehicle): boolean {
    return isVehicleElegible(vehicle);
  }

  updateStatusFilter(status: VehicleStatus): void {
    this.filterItems.emit({ status });
  }

  onChangeStatus(id: number, status: VehicleStatus, vin: string): void {
    this.edit.emit({ id, status, vin });
  }
}
