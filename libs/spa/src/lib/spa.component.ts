import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
