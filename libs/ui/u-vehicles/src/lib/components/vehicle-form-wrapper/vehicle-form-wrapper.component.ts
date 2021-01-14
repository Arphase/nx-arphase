import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-vehicle-form-wrapper',
  templateUrl: './vehicle-form-wrapper.component.html',
  styleUrls: ['./vehicle-form-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleFormWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
