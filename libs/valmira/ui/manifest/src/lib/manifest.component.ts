import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManifestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
