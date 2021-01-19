import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-revision-form',
  templateUrl: './revision-form.component.html',
  styleUrls: ['./revision-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevisionFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
