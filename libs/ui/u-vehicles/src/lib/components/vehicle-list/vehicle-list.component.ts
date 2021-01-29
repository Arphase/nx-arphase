import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle } from '@ivt/c-data';
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
  @Output() goToRevisions = new EventEmitter<Vehicle>();
  @Output() createGuarantee = new EventEmitter<Vehicle>();
  @Output() createRevisionRequest = new EventEmitter<Vehicle>();
}
