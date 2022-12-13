import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';

type ControlFactory<T> = (values: T) => AbstractControl;
const toFormControl = <T>(values: T) => new UntypedFormControl(values);

export function setFormArrayValue<T>(
  formArray: UntypedFormArray,
  values: T[],
  toSubControl: ControlFactory<T> = toFormControl
): UntypedFormArray {
  formArray.clear();
  values.map(toSubControl).forEach(control => formArray.push(control));

  return formArray;
}

export function findFormArrayIndex<T>(formArray: UntypedFormArray, findFn: (value: T) => boolean): number {
  const value: T[] = formArray.value;
  return value.findIndex(findFn);
}

export function collectFormErrors(form: UntypedFormGroup | UntypedFormArray): ValidationErrors {
  function hasControls(control: AbstractControl): control is UntypedFormGroup | UntypedFormArray {
    return control instanceof UntypedFormGroup || control instanceof UntypedFormArray;
  }

  function _collectFormErrors(_form: UntypedFormGroup | UntypedFormArray): ValidationErrors {
    let hasError = false;

    const result = Object.keys(_form.controls).reduce((acc, key) => {
      const control = _form.get(key);
      const errors = hasControls(control) ? _collectFormErrors(control) : control.errors;

      if (errors) {
        acc[key] = errors;

        hasError = true;
      }

      return acc;
    }, {} as Record<string, unknown>);

    return hasError ? result : null;
  }

  return _collectFormErrors(form);
}

export function updateFormControlsValueAndValidity(formGroup: UntypedFormGroup | UntypedFormArray) {
  traverseFormGroup(formGroup, control => control.updateValueAndValidity());
}

function traverseFormGroup(formGroup: UntypedFormGroup | UntypedFormArray, fn: (control: AbstractControl) => void) {
  if (!formGroup.controls) {
    fn(formGroup);
    return;
  }

  let control;
  Object.values(formGroup.controls).forEach(formControl => {
    control = formControl as UntypedFormGroup;
    fn(control);

    if (control.controls) {
      if (Array.isArray(control.controls)) {
        control.controls.forEach(c => traverseFormGroup(c, fn));
      } else {
        Object.keys(control.controls).forEach(field => {
          const formGroupControl = control.get(field);
          traverseFormGroup(formGroupControl as UntypedFormGroup, fn);
        });
      }
    }
  });
}
