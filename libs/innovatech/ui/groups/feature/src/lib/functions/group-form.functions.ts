import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { Company, Group, User } from '@innovatech/common/domain';
import { generateId, RfcValidatorTypes } from '@innovatech/common/utils';
import { createAddressForm } from '@innovatech/ui/addresses/ui';
import { setFormArrayValue } from '@innovatech/ui/core/data';

export function createGroupForm(group?: Group): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    contact: new FormControl(null, ApsValidators.required),
    email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
    phone: new FormControl(null, [ApsValidators.required, ApsValidators.phone]),
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
    businessName: new FormControl(null, ApsValidators.required),
    email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
    phone: new FormControl(null, [ApsValidators.required, ApsValidators.phone]),
    address: createAddressForm(),
    users: new FormArray([]),
    rfc: new FormControl(null, [ApsValidators.required, ApsValidators.rfc(RfcValidatorTypes.moral)]),
    contact: new FormControl(null, ApsValidators.required),
  });

  if (company) {
    patchCompanyForm(form, company);
  }

  return form;
}

export function patchCompanyForm(form: FormGroup, company: Company): void {
  form.patchValue(company);
  setFormArrayValue(form.get('users') as FormArray, company.users || [], user => createUserForm(user));
}

export function createUserForm(user?: User): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    tempId: new FormControl(generateId()),
    firstName: new FormControl(null, ApsValidators.required),
    lastName: new FormControl(null, ApsValidators.required),
    secondLastName: new FormControl(null, ApsValidators.required),
    email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
    phone: new FormControl(null, [ApsValidators.required, ApsValidators.phone]),
    rfc: new FormControl(null, [ApsValidators.required, ApsValidators.rfc(RfcValidatorTypes.physical)]),
    password: new FormControl(null),
  });

  if (user) {
    form.patchValue(user);
    if (user.password) {
      form.disable();
    }
  }
  return form;
}
