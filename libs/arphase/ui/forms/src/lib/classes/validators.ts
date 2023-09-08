import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { specialCharactersForPassword } from '@arphase/common';
import dayjs from 'dayjs';

export type ApsErrorsOptions = { es: string } & Record<string, unknown>;
export type ApsValidationErrors = Record<string, ApsErrorsOptions>;

export class ApsValidators {
  static required(control: AbstractControl): ApsValidationErrors | null {
    return Validators.required(control) === null ? null : { required: { es: `El campo es requerido` } };
  }

  static requiredNumber(c: AbstractControl): ApsValidationErrors | null {
    return !c.value && c.value !== 0 ? { requiredNumber: { es: `El campo es requerido` } } : null;
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null =>
      Validators.minLength(minLength)(control) === null
        ? null
        : { minlength: { es: `El campo debe tener al menos ${minLength} caracteres` } };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null =>
      Validators.maxLength(maxLength)(control) === null
        ? null
        : { minlength: { es: `El campo debe tener menos de ${maxLength + 1} caracteres` } };
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null =>
      Validators.min(min)(control) === null ? null : { minlength: { es: `El campo debe ser mayor o igual a ${min}` } };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null =>
      Validators.max(max)(control) === null ? null : { minlength: { es: `El campo no debe ser mayor a ${max}` } };
  }

  static phone(c: AbstractControl): ApsValidationErrors | null {
    const phoneExpression = /^\d{10}$/;
    return c.value && !phoneExpression.test(c.value)
      ? { phone: { es: `El campo tiene un formato inválido de teléfono` } }
      : null;
  }

  static email(c: AbstractControl): ApsValidationErrors | null {
    const emailExpression = /\S+@\S+\.\S+/;
    return c.value && !emailExpression.test(c.value)
      ? { email: { es: `El campo tiene un formato inválido de correo` } }
      : null;
  }

  static uppercase(control: AbstractControl): ApsValidationErrors | null {
    const value = String(control.value);
    return value.toLowerCase() === value ? { uppercase: { es: `El campo debe tener al menos una mayúscula` } } : null;
  }

  static matchPasswords(fieldOne: string, fieldTwo: string): ValidatorFn | null {
    return (control: AbstractControl): ApsValidationErrors | null =>
      control.get(fieldOne)?.value !== control.get(fieldTwo)?.value
        ? { matchPasswords: { es: 'Las contraseñas no coinciden ' } }
        : null;
  }

  static minMax(minField: string, maxField: string): ValidatorFn | null {
    return (control: AbstractControl): ApsValidationErrors | null =>
      Number(control.get(minField)?.value) > Number(control.get(maxField)?.value)
        ? { minMax: { es: `El campo ${minField} no puede ser mayor a ${maxField}` } }
        : null;
  }

  static dateLessThan(startDateField: string, endDateField: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const startDate = c.get(startDateField).value;
      const endDate = c.get(endDateField).value;
      return startDate && endDate && dayjs(startDate).isAfter(endDate) ? { dateLessThan: true } : null;
    };
  }

  static specialCharacter(control: AbstractControl): ApsValidationErrors | null {
    const value = String(control.value);
    return !specialCharactersForPassword.some(character => value.includes(character))
      ? { specialCharacter: { es: 'El campo debe tener al menos un caracter especial' } }
      : null;
  }
}
