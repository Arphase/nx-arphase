import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

type ControlFactory<T> = (values: T) => AbstractControl;

const toFormControl = <T>(values: T) => new FormControl(values);

export function setFormArrayValue<T>(
  formArray: FormArray,
  values: T[],
  toSubControl: ControlFactory<T> = toFormControl,
): FormArray {
  formArray.clear();
  values.map(toSubControl).forEach(control => formArray.push(control));

  return formArray;
}

export function findFormArrayIndex<T>(formArray: FormArray, findFn: (value: T) => boolean): number {
  const value: T[] = formArray.value;
  return value.findIndex(findFn);
}

export function collectFormErrors(form: FormGroup | FormArray): ValidationErrors {
  function hasControls(control: AbstractControl): control is FormGroup | FormArray {
    return control instanceof FormGroup || control instanceof FormArray;
  }

  function _collectFormErrors(_form: FormGroup | FormArray): ValidationErrors {
    let hasError = false;

    const result = Object.keys(_form.controls).reduce(
      (acc, key) => {
        const control = _form.get(key);
        const errors = hasControls(control) ? _collectFormErrors(control) : control.errors;

        if (errors) {
          acc[key] = errors;

          hasError = true;
        }

        return acc;
      },
      {} as Record<string, unknown>,
    );

    return hasError ? result : null;
  }

  return _collectFormErrors(form);
}

export function updateFormControlsValueAndValidity(formGroup: FormGroup | FormArray) {
  traverseFormGroup(formGroup, control => control.updateValueAndValidity());
}

function traverseFormGroup(formGroup: FormGroup | FormArray, fn: (control: AbstractControl) => void) {
  if (!formGroup.controls) {
    fn(formGroup);
    return;
  }

  let control;
  Object.values(formGroup.controls).forEach(formControl => {
    control = formControl as FormGroup;
    fn(control);

    if (control.controls) {
      if (Array.isArray(control.controls)) {
        control.controls.forEach(c => traverseFormGroup(c, fn));
      } else {
        Object.keys(control.controls).forEach(field => {
          const formGroupControl = control.get(field);
          traverseFormGroup(formGroupControl as FormGroup, fn);
        });
      }
    }
  });
}

export function enableControl(
  control: AbstractControl,
  shouldEnable: boolean,
  options?: { emitEvent?: boolean; onlySelf?: boolean },
) {
  shouldEnable ? control.enable(options) : control.disable(options);
}

export function disableControl(
  control: AbstractControl,
  shouldEnable: boolean,
  options?: { emitEvent?: boolean; onlySelf?: boolean },
) {
  enableControl(control, !shouldEnable, options);
}
