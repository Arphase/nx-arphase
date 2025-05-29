import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { collectFormErrors, updateFormControlsValueAndValidity } from '../functions';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type ControlsOf<T extends Record<string, any>> = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

@Component({
  selector: 'aps-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ApsFormComponent<T, F = unknown> {
  @Input() form: FormGroup<ControlsOf<T>> | FormGroup<ControlsOf<F>>;
  formSignal = input<FormGroup<ControlsOf<T>> | FormGroup<ControlsOf<F>>>();
  @Input() item: T;
  @Input() loading: boolean;
  @Input() isEditable = true;
  @Output() submitForm = new EventEmitter<T>();

  get values(): T {
    return this.form?.getRawValue() as T;
  }

  /**
   * Transform the values of the form to what you want
   * to sen to the parent component.
   * @param values
   * @returns from form
   */
  transformFromForm(values: F): T {
    return values as unknown as T;
  }

  submit(): void {
    if (this.form.valid || this.form.disabled) {
      const transformedForm = this.transformFromForm(this.values as unknown as F);
      this.submitForm.emit(transformedForm);
    } else {
      this.form.markAllAsTouched();
      setTimeout(() => updateFormControlsValueAndValidity(this.form));

      // eslint-disable-next-line no-restricted-syntax
      console.info('Tried to submit form with errors:', {
        form: this.form.errors,
        controls: collectFormErrors(this.form),
      });
    }
  }
}
