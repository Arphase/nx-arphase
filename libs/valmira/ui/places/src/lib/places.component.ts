import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'vma-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
