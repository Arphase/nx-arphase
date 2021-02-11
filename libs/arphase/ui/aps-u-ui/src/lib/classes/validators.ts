import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { specialCharactersForPassword } from '@ivt/c-data';
import { rfcValidations, RfcValidatorTypes } from '@ivt/c-utils';

export type ApsErrorsOptions = { es: string } & Record<string, unknown>;
export type ApsValidationErrors = Record<string, ApsErrorsOptions>;

export class ApsValidators {
  static required(control: AbstractControl): ApsValidationErrors {
    if (Validators.required(control) === null) {
      return null;
    }
    return { required: { es: `El campo es requerido` } };
  }

  static requiredNumber(c: AbstractControl): ApsValidationErrors {
    if (!c.value) {
      return { requiredNumber: { es: `El campo es requerido` } };
    }
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { es: `El campo debe tener al menos ${minLength} caracteres` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { minlength: { es: `El campo debe tener menos de ${maxLength + 1} caracteres` } };
    };
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null => {
      if (Validators.min(min)(control) === null) {
        return null;
      }
      return { minlength: { es: `El campo debe ser mayor o igual a ${min}` } };
    };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null => {
      if (Validators.max(max)(control) === null) {
        return null;
      }
      return { minlength: { es: `El campo no debe ser mayor a ${max}` } };
    };
  }

  static rfc(type: RfcValidatorTypes = RfcValidatorTypes.any): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors => {
      if (!rfcValidations[type](control.value)) {
        return { rfc: { es: `El campo tiene un formato inválido de RFC` } };
      }
      return null;
    };
  }

  static phone(c: AbstractControl): ApsValidationErrors {
    const phoneExpression = /^\d{10}$/;
    if (c.value && !phoneExpression.test(c.value)) {
      return { phone: { es: `El campo tiene un formato inválido de teléfono` } };
    }
  }

  static email(c: AbstractControl): ApsValidationErrors {
    const emailExpression = /\S+@\S+\.\S+/;
    if (c.value && !emailExpression.test(c.value)) {
      return { email: { es: `El campo tiene un formato inválido de correo` } };
    }
  }

  static uppercase(control: AbstractControl): ApsValidationErrors {
    const value = String(control.value);
    if (value.toLowerCase() === value) {
      return { uppercase: { es: `El campo debe tener al menos una mayúscula` } };
    }
    return null;
  }

  static specialCharacter(control: AbstractControl): ApsValidationErrors {
    const value = String(control.value);
    if (!specialCharactersForPassword.some(character => value.includes(character))) {
      return { specialCharacter: { es: 'El campo debe tener al menos un caracter especial' } };
    }
    return null;
  }

  static matchPasswords(fieldOne: string, fieldTwo: string): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors => {
      if (control.get(fieldOne).value !== control.get(fieldTwo).value) {
        return { matchPasswords: { es: 'Las contraseñas no coinciden ' } };
      }
      return null;
    };
  }
}
