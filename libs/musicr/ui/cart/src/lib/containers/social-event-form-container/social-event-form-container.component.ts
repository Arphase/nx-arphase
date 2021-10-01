import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-social-event-form-container',
  templateUrl: './social-event-form-container.component.html',
  styleUrls: ['./social-event-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialEventFormContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
