import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address, DeepPartial } from '@arphase/common';
import { createAddressForm } from '@arphase/ui/addresses';
import { filterNil } from '@arphase/ui/utils';
import { ApsFormComponent, ApsValidators, ControlsOf } from '@arphase/ui/forms';
import {
  Client,
  Guarantee,
  isVehicleElegible,
  MoralPerson,
  PersonTypes,
  PhysicalPerson,
  UserRoles,
  Vehicle,
} from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { IvtValidators } from '@innovatech/ui/core/util';
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

export function createGuaranteeForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    productId: new FormControl(null, ApsValidators.required),
    startDate: new FormControl(null, ApsValidators.required),
    endDate: new FormControl(null, ApsValidators.required),
    companyId: new FormControl(null, ApsValidators.required),
    kilometrageStart: new FormControl(null, ApsValidators.requiredNumber),
    kilometrageEnd: new FormControl(null, ApsValidators.requiredNumber),
    client: new FormGroup({
      id: new FormControl(null),
      personType: new FormControl(null, ApsValidators.required),
      rfc: new FormControl(null, [ApsValidators.required, IvtValidators.rfc(RfcValidatorTypes.any)]),
      phone: new FormControl(null, [ApsValidators.required, ApsValidators.phone]),
      email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
      salesPlace: new FormControl(null, ApsValidators.required),
      physicalInfo: new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, ApsValidators.required),
        lastName: new FormControl(null, ApsValidators.required),
        secondLastName: new FormControl(null, ApsValidators.required),
        birthDate: new FormControl(null, ApsValidators.required),
      }),
      moralInfo: new FormGroup({
        id: new FormControl(null),
        businessName: new FormControl(null, ApsValidators.required),
        constitutionDate: new FormControl(null, ApsValidators.required),
        adviser: new FormControl(null, ApsValidators.required),
      }),
      address: createAddressForm(),
    }),
    vehicle: createVehicleForm(),
  });
}

@UntilDestroy()
@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class GuaranteeFormComponent
  extends ApsFormComponent<DeepPartial<Guarantee>>
  implements OnChanges, AfterViewInit
{
  @Input() productOptions: NzSelectOptionInterface[] = [];
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
  @Input() error: string;
  @Input() showCompanyInput: boolean;
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;
  personTypeOptions: NzSelectOptionInterface[] = [
    { label: 'Física', value: PersonTypes.physical },
    { label: 'Moral', value: PersonTypes.moral },
  ];
  companyId$: Observable<number>;
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<QueryParams>();

  get client(): FormGroup<ControlsOf<Client>> {
    return this.form.get('client') as FormGroup;
  }

  get vehicleForm(): FormGroup<ControlsOf<Vehicle>> {
    return this.form.get('vehicle') as FormGroup;
  }

  get year$(): Observable<number> {
    return this.vehicleForm.get('year').valueChanges.pipe(startWith(this.vehicleForm.get('year').value));
  }

  get horsePower$(): Observable<number> {
    return this.vehicleForm.get('horsePower').valueChanges.pipe(startWith(this.vehicleForm.get('horsePower').value));
  }

  get addressForm(): FormGroup<ControlsOf<Address>> {
    return this.client.get('address') as FormGroup;
  }

  get physicalInfoForm(): FormGroup<ControlsOf<PhysicalPerson>> {
    return this.client.get('physicalInfo') as FormGroup;
  }

  get moralInfoForm(): FormGroup<ControlsOf<MoralPerson>> {
    return this.client.get('moralInfo') as FormGroup;
  }

  get isElegible(): boolean {
    return !this.currentVehicle || isVehicleElegible(this.currentVehicle);
  }

  get disableSubmit(): boolean {
    return !this.isElegible || !!this.error;
  }

  get showProductError(): boolean {
    return (
      !this.productOptions.length && !!this.vehicleForm.get('horsePower').value && !!this.vehicleForm.get('year').value
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.form && this.form) {
      this.client
        .get('personType')
        .valueChanges.pipe(filterNil(), untilDestroyed(this))
        .subscribe(value => this.personTypeChange(value));
      this.companyId$ = this.form.get('companyId').valueChanges;
    }

    if (changes.isEditable && this.item) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }

    if (changes.showCompanyInput) {
      this.showCompanyInput
        ? this.form.get('companyId').enable({ emitEvent: false })
        : this.form.get('companyId').disable({ emitEvent: false });
    }
  }

  ngAfterViewInit() {
    if (this.item) {
      this.form.patchValue({
        ...this.item,
        client: {
          ...this.item.client,
          moralInfo: this.item.client.moralInfo ?? {},
          physicalInfo: this.item.client.physicalInfo ?? {},
        },
      });
    }
  }

  personTypeChange(value: string): void {
    this.showPhysicalForm = value === PersonTypes.physical;
    this.showMoralForm = value === PersonTypes.moral;

    if (this.isEditable) {
      if (this.showPhysicalForm) {
        this.moralInfoForm.disable();
        this.physicalInfoForm.enable();
      } else {
        this.moralInfoForm.enable();
        this.physicalInfoForm.disable();
      }
    }
  }
}
