import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
const RFC_EXPRESSION_MORAL = /^([A-ZÑ&a-z&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Za-z\d]{2})([A\d])$/;
const RFC_EXPRESSION_PHYSICAL = /^([A-ZÑ&a-z&]{4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Za-z\d]{2})([A\d])$/;

export function isMoralRfc(rfc: string): boolean {
  return RFC_EXPRESSION_MORAL.test(rfc);
}

export function isPhysicalRfc(rfc: string): boolean {
  return RFC_EXPRESSION_PHYSICAL.test(rfc);
}

export function isRfc(rfc: string) {
  if (isMoralRfc(rfc)) {
    return 'moral';
  }

  if (isPhysicalRfc(rfc)) {
    return 'physical';
  }

  return null;
}

const validations = {
  any: isRfc,
  moral: isMoralRfc,
  physical: isPhysicalRfc,
};

export function validateRfc(
  type: 'moral' | 'physical' | 'any' = 'any'
): ValidatorFn {
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