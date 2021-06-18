import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui';

@Component({
  selector: 'mrl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent extends ApsFormComponent {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name:[null, ApsValidators.required],
      phone:[null, ApsValidators.required],
      email: [null, [ApsValidators.required, ApsValidators.email]],
      message:[null, ApsValidators.required]
    });
  }
}
