import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Vehicle } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-vehicle-row',
  templateUrl: './vehicle-row.component.html',
  styleUrls: ['./vehicle-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleRowComponent extends IvtRowComponent<Vehicle> {
  @Output() goToRevisions = new EventEmitter<Vehicle>();
}
