import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-revision-row',
  templateUrl: './revision-row.component.html',
  styleUrls: ['./revision-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevisionRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
