import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsValidators, setFormArrayValue } from '@arphase/ui/forms';
import { Company, Group, User } from '@innovatech/common/domain';
import { generateId, RfcValidatorTypes } from '@innovatech/common/utils';
import { IvtValidators } from '@innovatech/ui/core/util';

export function createGroupForm(group?: Group): UntypedFormGroup {
  const form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    contact: new UntypedFormControl(null, ApsValidators.required),
    email: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.email]),
    phone: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.phone]),
    companies: new UntypedFormArray([]),
  });

  if (group) {
    patchGroupForm(form, group);
  }

  return form;
}

export function patchGroupForm(form: UntypedFormGroup, group: Group): void {
  form.patchValue(group);
  setFormArrayValue(form.get('companies') as UntypedFormArray, group.companies, company => createCompanyForm(company));
}

export function createCompanyForm(company?: Company): UntypedFormGroup {
  const form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    tempId: new UntypedFormControl(generateId()),
    businessName: new UntypedFormControl(null, ApsValidators.required),
    email: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.email]),
    phone: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.phone]),
    address: createAddressForm(),
    users: new UntypedFormArray([]),
    rfc: new UntypedFormControl(null, [ApsValidators.required, IvtValidators.rfc(RfcValidatorTypes.moral)]),
    contact: new UntypedFormControl(null, ApsValidators.required),
  });

  if (company) {
    patchCompanyForm(form, company);
  }

  return form;
}

export function patchCompanyForm(form: UntypedFormGroup, company: Company): void {
  form.patchValue(company);
  setFormArrayValue(form.get('users') as UntypedFormArray, company.users || [], user => createUserForm(user));
}

export function createUserForm(user?: User): UntypedFormGroup {
  const form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    tempId: new UntypedFormControl(generateId()),
    firstName: new UntypedFormControl(null, ApsValidators.required),
    lastName: new UntypedFormControl(null, ApsValidators.required),
    secondLastName: new UntypedFormControl(null, ApsValidators.required),
    email: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.email]),
    phone: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.phone]),
  });

  if (user) {
    form.patchValue(user);
    if (user.password) {
      form.disable();
    }
  }
  return form;
}
