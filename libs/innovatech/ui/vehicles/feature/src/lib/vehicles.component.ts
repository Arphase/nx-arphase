import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent {}
