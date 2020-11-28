import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '@ivt/c-data';
import { RfcValidatorTypes } from '@ivt/c-utils';
import { createAddressForm, IvtValidators, setFormArrayValue } from '@ivt/u-ui';

import { createUserForm } from '../user-form/user-form.constants';

export function createCompanyForm(company?: Company): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    businessName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
    address: createAddressForm(),
    users: new FormArray([createUserForm()]),
    rfc: new FormControl(null, [Validators.required, IvtValidators.rfc(RfcValidatorTypes.any)]),
    contact: new FormControl(null, Validators.required),
  });

  if (company) {
    patchCompanyForm(form, company);
  }

  return form;
}

export function patchCompanyForm(form: FormGroup, company: Company): void {
  form.patchValue(company);
  setFormArrayValue(form.get('users') as FormArray, company.users, user => createUserForm(user));
}
