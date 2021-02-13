import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isVehicleElegible, Vehicle, VehicleStatus } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns } from './vehicle-list.constants';

@Component({
  selector: 'ivt-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListComponent extends IvtListComponent<Vehicle> {
  @Input() canCreateReviewRequest: boolean;
  @Input() canManageRevisions: boolean;
  columns = columns;
  vehicleStatus = VehicleStatus;
  colorMaps: Record<VehicleStatus, string> = {
    [VehicleStatus.elegible]: 'success',
    [VehicleStatus.needsRevision]: 'warning',
    [VehicleStatus.notElegible]: 'error',
    [VehicleStatus.hasActiveGuarantee]: 'processing',
  };
  iconMaps: Record<VehicleStatus, string> = {
    [VehicleStatus.elegible]: 'check-circle',
    [VehicleStatus.needsRevision]: 'exclamation-circle',
    [VehicleStatus.notElegible]: 'close-circle',
    [VehicleStatus.hasActiveGuarantee]: 'sync',
  };
  statusLabels: Record<string, string> = {
    [VehicleStatus[VehicleStatus.notElegible]]: 'No garantizable',
    [VehicleStatus[VehicleStatus.hasActiveGuarantee]]: 'Garantía vigente',
    [VehicleStatus[VehicleStatus.needsRevision]]: 'Necesita revisión',
    [VehicleStatus[VehicleStatus.elegible]]: 'Garantizable',
  };

  @Output() goToRevisions = new EventEmitter<Vehicle>();
  @Output() createGuarantee = new EventEmitter<Vehicle>();
  @Output() createRevisionRequest = new EventEmitter<Vehicle>();

  isElegible(vehicle: Vehicle): boolean {
    return isVehicleElegible(vehicle);
  }
}
