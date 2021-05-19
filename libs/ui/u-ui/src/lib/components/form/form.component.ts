import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { collectFormErrors, updateFormControlsValueAndValidity } from '../../functions';

@Component({
  selector: 'ivt-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFormComponent<T = any, F = any> {
  @Input() form: FormGroup;
  @Input() item: T;
  @Input() loading: boolean;
  @Input() isEditable = true;
  @Output() submitForm = new EventEmitter<T>();

  get values(): T {
    return this.form?.getRawValue() as T;
  }

  transformFromForm(values: F): T {
    return values as any;
  }

  submit(): void {
    if (this.form.valid || this.form.disabled) {
      const transformedForm = this.transformFromForm(this.values as any);
      this.submitForm.emit(transformedForm);
    } else {
      this.form.markAllAsTouched();
      setTimeout(() => updateFormControlsValueAndValidity(this.form));

      console.info('Tried to submit form with errors:', {
        form: this.form.errors,

        controls: collectFormErrors(this.form),
      });
    }
  }
}
