import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { collectFormErrors } from '../../functions';
import { IvtSubscriberComponent } from '../subscriber';

@Component({
  selector: 'ivt-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFormComponent<T> extends IvtSubscriberComponent {
  @Input() form: FormGroup;
  @Input() item: T;
  @Input() loading: boolean;
  @Input() isEditable = true;
  protected stateChanged = new Subject<void>();
  @Output() submitForm = new EventEmitter<T>();

  get values(): T {
    return this.form?.getRawValue() as T;
  }

  submit(): void {
    if (this.form.valid || this.form.disabled) {
      this.submitForm.emit(this.values);
    } else {
      this.form.markAllAsTouched();
      console.info('Tried to submit form with errors:', {
        form: this.form.errors,

        controls: collectFormErrors(this.form),
      });
    }
    this.stateChanged.next();
  }
}
