import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { markFormGroupTouched } from '../../functions';
import { IvtSubscriberComponent } from '../subscriber';

@Component({
  selector: 'ivt-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFormComponent<T = any> extends IvtSubscriberComponent {
  @Input() form: FormGroup;
  @Input() item: Partial<T>;
  @Input() loading: boolean;
  @Input() isEditable = true;
  @Output() submitForm = new EventEmitter<T>();

  get values(): T {
    return this.form?.getRawValue() as T;
  }

  submit(): void {
    console.log(this.form.valid);
    if (this.form.valid || this.form.disabled) {
      this.submitForm.emit(this.values);
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
