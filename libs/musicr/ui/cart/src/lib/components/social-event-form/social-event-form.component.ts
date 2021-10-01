import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-social-event-form',
  templateUrl: './social-event-form.component.html',
  styleUrls: ['./social-event-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialEventFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
