import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { rfcValidations, RfcValidatorTypes } from '@ivt/c-utils';

export class IvtValidators {
  static rfc(type: RfcValidatorTypes = RfcValidatorTypes.any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!rfcValidations[type](control.value)) {
        return { rfc: true };
      }
      return null;
    };
  }

  static minInArray(min: number): ValidatorFn {
    return (control: FormArray): ValidationErrors => {
      if (control.controls.length < min) {
        return { minInArray: true };
      }
      return null;
    };
  }
}
