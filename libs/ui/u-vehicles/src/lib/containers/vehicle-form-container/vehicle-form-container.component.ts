import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-vehicle-form-container',
  templateUrl: './vehicle-form-container.component.html',
  styleUrls: ['./vehicle-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleFormContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
