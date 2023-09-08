import { FormControl, FormGroup } from '@angular/forms';
import { DeepPartial } from '@arphase/common';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsValidators, ControlsOf } from '@arphase/ui/forms';
import { Client, Guarantee, MoralPerson, PersonTypes, PhysicalPerson, Vehicle } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { IvtValidators } from '@innovatech/ui/core/util';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export function createGuaranteeForm(): FormGroup {
  return new FormGroup<ControlsOf<DeepPartial<Guarantee>>>({
    id: new FormControl(null),
    productId: new FormControl(null, ApsValidators.required),
    startDate: new FormControl(null, ApsValidators.required) as unknown as FormGroup<ControlsOf<Partial<Date>>>,
    endDate: new FormControl(null, ApsValidators.required) as unknown as FormGroup<ControlsOf<Partial<Date>>>,
    companyId: new FormControl(null, ApsValidators.required),
    kilometrageStart: new FormControl(null, ApsValidators.requiredNumber),
    kilometrageEnd: new FormControl(null, ApsValidators.requiredNumber),
    client: new FormGroup<ControlsOf<DeepPartial<Client>>>({
      id: new FormControl(null),
      personType: new FormControl(null, ApsValidators.required),
      rfc: new FormControl(null, [IvtValidators.rfc(RfcValidatorTypes.any)]),
      phone: new FormControl(null, [ApsValidators.required, ApsValidators.phone]),
      email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
      salesPlace: new FormControl(null, ApsValidators.required),
      physicalInfo: new FormGroup<ControlsOf<DeepPartial<PhysicalPerson>>>({
        id: new FormControl(null),
        name: new FormControl(null, ApsValidators.required),
        lastName: new FormControl(null, ApsValidators.required),
        secondLastName: new FormControl(null, ApsValidators.required),
        birthDate: new FormControl(null, ApsValidators.required) as unknown as FormGroup<ControlsOf<Partial<Date>>>,
      }),
      moralInfo: new FormGroup<ControlsOf<DeepPartial<MoralPerson>>>({
        id: new FormControl(null),
        businessName: new FormControl(null, ApsValidators.required),
        constitutionDate: new FormControl(null, ApsValidators.required) as unknown as FormGroup<
          ControlsOf<Partial<Date>>
        >,
        adviser: new FormControl(null, ApsValidators.required),
      }),
      address: createAddressForm(),
    }),
    vehicle: createVehicleForm() as FormGroup<ControlsOf<DeepPartial<Vehicle>>>,
  });
}

export const personTypeOptions: NzSelectOptionInterface[] = [
  { label: 'Física', value: PersonTypes.physical },
  { label: 'Moral', value: PersonTypes.moral },
];
