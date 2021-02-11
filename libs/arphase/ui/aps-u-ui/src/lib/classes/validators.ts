import { AbstractControl, Validators } from '@angular/forms';

export type ApsErrorsOptions = { es: string } & Record<string, unknown>;
export type ApsValidationErrors = Record<string, ApsErrorsOptions>;

export class ApsValidators {
  static required(control: AbstractControl): ApsValidationErrors {
    if (Validators.required(control) === null) {
      return null;
    }
    return { required: { es: `El campo es requerido` } };
  }
}
