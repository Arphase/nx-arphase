import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { specialCharactersForPassword } from '@ivt/c-data';
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

  static uppercase(control: AbstractControl): ValidationErrors {
    const value = String(control.value);
    if (value.toLowerCase() === value) {
      return { uppercase: true };
    }
    return null;
  }

  static specialCharacter(control: AbstractControl): ValidationErrors {
    const value = String(control.value);
    if (!specialCharactersForPassword.some(character => value.includes(character))) {
      return { specialCharacter: true };
    }
    return null;
  }

  static matchPasswords(fieldOne: string, fieldTwo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.get(fieldOne).value !== control.get(fieldTwo).value) {
        return { matchPasswords: true };
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