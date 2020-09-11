import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  @Output() submitForm = new EventEmitter<T>();

  get values(): T {
    return this.form?.getRawValue() as T;
  }

  submit(): void {
    if (this.form.valid || this.form.disabled) {
      this.submitForm.emit(this.values);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
