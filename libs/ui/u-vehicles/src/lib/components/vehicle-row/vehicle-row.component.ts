import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Vehicle, VehicleStatus } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-vehicle-row',
  templateUrl: './vehicle-row.component.html',
  styleUrls: ['./vehicle-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleRowComponent extends IvtRowComponent<Vehicle> {
  backgroundClasses: Record<string, string> = {
    [VehicleStatus[VehicleStatus.needsRevision]]: 'bg-warning',
    [VehicleStatus[VehicleStatus.elegible]]: 'bg-success',
  };

  statusLabels: Record<string, string> = {
    [VehicleStatus[VehicleStatus.needsRevision]]: 'Necesita revisión',
    [VehicleStatus[VehicleStatus.elegible]]: 'Garantizable',
  };

  @Output() goToRevisions = new EventEmitter<Vehicle>();
  @Output() createGuarantee = new EventEmitter<Vehicle>();
}
