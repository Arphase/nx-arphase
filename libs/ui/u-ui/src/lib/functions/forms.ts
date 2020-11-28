import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export function markFormGroupTouched(formGroup: FormGroup) {
  traverseFormGroup(formGroup, control => control.markAsTouched());
}

function traverseFormGroup(formGroup: FormGroup, fn: (control: AbstractControl) => void) {
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

type ControlFactory<T> = (values: T) => AbstractControl;
const toFormControl = <T>(values: T) => new FormControl(values);

export function setFormArrayValue<T>(
  formArray: FormArray,
  values: T[],
  toSubControl: ControlFactory<T> = toFormControl
) {
  formArray.clear();
  values.map(toSubControl).forEach(control => formArray.push(control));

  return formArray;
}
