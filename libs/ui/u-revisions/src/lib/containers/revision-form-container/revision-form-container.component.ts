import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-revision-form-container',
  templateUrl: './revision-form-container.component.html',
  styleUrls: ['./revision-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevisionFormContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
