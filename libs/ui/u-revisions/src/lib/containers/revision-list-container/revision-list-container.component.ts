import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-revision-list-container',
  templateUrl: './revision-list-container.component.html',
  styleUrls: ['./revision-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevisionListContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
