import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import { isVehicleElegible, UserRoles, Vehicle, VehicleStatus, vehicleStatusLabels } from '@innovatech/common/domain';

import { colorMaps, columns, iconMaps, statusOptions } from './vehicle-list.constants';

@Component({
  selector: 'ivt-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VehicleListComponent extends ApsListComponent<Vehicle> {
  columns = columns;
  vehicleStatus = VehicleStatus;
  colorMaps = colorMaps;
  iconMaps = iconMaps;
  statusLabels = vehicleStatusLabels;
  statusOptions = statusOptions;
  userRoles = UserRoles;
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
