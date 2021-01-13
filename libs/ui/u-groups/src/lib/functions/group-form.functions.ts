import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company, Group, User } from '@ivt/c-data';
import { generateId, RfcValidatorTypes } from '@ivt/c-utils';
import { createAddressForm, IvtValidators, setFormArrayValue } from '@ivt/u-ui';

export function createGroupForm(group?: Group): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    contact: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
    companies: new FormArray([]),
  });

  if (group) {
    patchGroupForm(form, group);
  }

  return form;
}

export function patchGroupForm(form: FormGroup, group: Group): void {
  form.patchValue(group);
  setFormArrayValue(form.get('companies') as FormArray, group.companies, company => createCompanyForm(company));
}

export function createCompanyForm(company?: Company): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    tempId: new FormControl(generateId()),
    businessName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
    address: createAddressForm(),
    users: new FormArray([]),
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

export function createUserForm(user?: User): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    tempId: new FormControl(generateId()),
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
