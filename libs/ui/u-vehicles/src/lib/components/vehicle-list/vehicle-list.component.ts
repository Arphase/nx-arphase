import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
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
  columns = columns;
  @Output() goToRevisions = new EventEmitter<Vehicle>();
  @Output() createGuarantee = new EventEmitter<Vehicle>();
}
