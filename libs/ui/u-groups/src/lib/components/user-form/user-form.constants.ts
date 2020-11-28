import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@ivt/c-data';
import { RfcValidatorTypes } from '@ivt/c-utils';
import { IvtValidators } from '@ivt/u-ui';

export function createUserForm(user?: User): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    secondLastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
    rfc: new FormControl(null, [Validators.required, IvtValidators.rfc(RfcValidatorTypes.any)]),
  });

  if (user) {
    form.patchValue(user);
  }
  return form;
}
