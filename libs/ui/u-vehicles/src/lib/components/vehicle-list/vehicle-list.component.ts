import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Vehicle } from '@ivt/c-data';
import { IvtColumns, IvtListComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleListComponent extends IvtListComponent<Vehicle> {
  columns: IvtColumns = [];
}
