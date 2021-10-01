import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-personal-data-form-container',
  templateUrl: './personal-data-form-container.component.html',
  styleUrls: ['./personal-data-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
