import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { rfcValidations } from '@ivt/c-utils';

export function validateRfc(type: 'moral' | 'physical' | 'any' = 'any'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!rfcValidations[type](control.value)) {
      return { rfc: true };
    }

    return null;
  };
}

export class IvtValidators {
  static rfc(type: 'physical' | 'moral' | 'any' = 'any'): ValidatorFn {
    return validateRfc(type);
  }
}
