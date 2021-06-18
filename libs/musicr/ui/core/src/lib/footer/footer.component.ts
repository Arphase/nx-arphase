import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui';

@Component({
  selector: 'mrl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent extends ApsFormComponent {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      name: '',
      phone: '',
      email: '',
      message: '',
    });
  }
}
