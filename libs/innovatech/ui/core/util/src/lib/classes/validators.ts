import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ApsValidationErrors } from '@arphase/ui/forms';
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
}
