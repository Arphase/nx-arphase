import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-vehicle-list-container',
  templateUrl: './vehicle-list-container.component.html',
  styleUrls: ['./vehicle-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleListContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
