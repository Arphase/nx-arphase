import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ApsValidationErrors } from '@arphase/ui';
import { specialCharactersForPassword } from '@innovatech/common/domain';
import { rfcValidations, RfcValidatorTypes } from '@innovatech/common/utils';

export class IvtValidators {
  static rfc(type: RfcValidatorTypes = RfcValidatorTypes.any): ValidatorFn {
    return (control: AbstractControl): ApsValidationErrors | null => {
      if (!rfcValidations[type](control.value)) {
        return { rfc: { es: `El campo tiene un formato inválido de RFC` } };
      }
      return null;
    };
  }

  static specialCharacter(control: AbstractControl): ApsValidationErrors | null {
    const value = String(control.value);
    if (!specialCharactersForPassword.some(character => value.includes(character))) {
      return { specialCharacter: { es: 'El campo debe tener al menos un caracter especial' } };
    }
    return null;
  }
}
