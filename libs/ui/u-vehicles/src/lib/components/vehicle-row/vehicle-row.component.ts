import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle, VehicleStatus } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-vehicle-row',
  templateUrl: './vehicle-row.component.html',
  styleUrls: ['./vehicle-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleRowComponent extends IvtRowComponent<Vehicle> {
  @Input() canCreateReviewRequest: boolean;
  @Input() canManageRevisions: boolean;
  backgroundClasses: Record<string, string> = {
    [VehicleStatus[VehicleStatus.notElegible]]: 'bg-alert',
    [VehicleStatus[VehicleStatus.hasActiveGuarantee]]: 'bg-info',
    [VehicleStatus[VehicleStatus.needsRevision]]: 'bg-warning',
    [VehicleStatus[VehicleStatus.elegible]]: 'bg-success',
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
}
