import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevisionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
