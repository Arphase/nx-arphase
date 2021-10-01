import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
