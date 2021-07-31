import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import dayjs from 'dayjs';

export type ApsErrorsOptions = { es: string } & Record<string, unknown>;
export type ApsValidationErrors = Record<string, ApsErrorsOptions>;

export class ApsValidators {
  static required(control: AbstractControl): ApsValidationErrors | null {
    if (Validators.required(control) === null) {
      return null;
    }
    return { required: { es: `El campo es requerido` } };
  }

  static requiredNumber(c: AbstractControl): ApsValidationErrors | null {
    if (!c.value && c.value !== 0) {
      return { requiredNumber: { es: `El campo es requerido` } };
    }
    return null;
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

  static phone(c: AbstractControl): ApsValidationErrors | null {
    const phoneExpression = /^\d{10}$/;
    if (c.value && !phoneExpression.test(c.value)) {
      return { phone: { es: `El campo tiene un formato inválido de teléfono` } };
    }
    return null;
  }

  static email(c: AbstractControl): ApsValidationErrors | null {
    const emailExpression = /\S+@\S+\.\S+/;
    if (c.value && !emailExpression.test(c.value)) {
      return { email: { es: `El campo tiene un formato inválido de correo` } };
    }
    return null;
  }

  static uppercase(control: AbstractControl): ApsValidationErrors | null {
    const value = String(control.value);
    if (value.toLowerCase() === value) {
      return { uppercase: { es: `El campo debe tener al menos una mayúscula` } };
    }
    return null;
  }

  static matchPasswords(fieldOne: string, fieldTwo: string): ValidatorFn | null {
    return (control: AbstractControl): ApsValidationErrors | null => {
      if (control.get(fieldOne)?.value !== control.get(fieldTwo)?.value) {
        return { matchPasswords: { es: 'Las contraseñas no coinciden ' } };
      }
      return null;
    };
  }

  static minMax(minField: string, maxField: string): ValidatorFn | null {
    return (control: AbstractControl): ApsValidationErrors | null => {
      if (Number(control.get(minField)?.value) > Number(control.get(maxField)?.value)) {
        return { minMax: { es: `El campo ${minField} no puede ser mayor a ${maxField}` } };
      }
      return null;
    };
  }

  static dateLessThan(startDateField: string, endDateField: string): ValidatorFn {
    function validator(c: AbstractControl): { [key: string]: boolean } | null {
      const startDate = c.get(startDateField).value;
      const endDate = c.get(endDateField).value;
      if (startDate && endDate && dayjs(startDate).isAfter(endDate)) {
        return { dateLessThan: true };
      }
      return null;
    }
    return validator;
  }
}
