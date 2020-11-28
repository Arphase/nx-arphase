import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { rfcValidations, RfcValidatorTypes } from '@ivt/c-utils';

export function validateRfc(type: RfcValidatorTypes = RfcValidatorTypes.any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!rfcValidations[type](control.value)) {
      return { rfc: true };
    }
    return null;
  };
}

export class IvtValidators {
  static rfc(type: RfcValidatorTypes = RfcValidatorTypes.any): ValidatorFn {
    return validateRfc(type);
  }
}
