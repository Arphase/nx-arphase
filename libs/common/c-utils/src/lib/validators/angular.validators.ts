import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { validations } from '../constants/validators.constants';

export function validateRfc(type: 'moral' | 'physical' | 'any' = 'any'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!validations[type](control.value)) {
      return { rfc: true };
    }

    return null;
  };
}

export class CustomValidators {
  static rfc(type: 'physical' | 'moral' | 'any' = 'any'): ValidatorFn {
    return validateRfc(type);
  }
}
