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
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsFormComponent, ApsValidators, filterNil } from '@arphase/ui/core';
import { Guarantee, isVehicleElegible, PersonTypes, UserRoles, Vehicle } from '@innovatech/common/domain';
import { RfcValidatorTypes } from '@innovatech/common/utils';
import { IvtValidators } from '@innovatech/ui/core/util';
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';
import { createVehicleForm } from '@innovatech/ui/vehicles/ui';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

export function createGuaranteeForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    id: new UntypedFormControl(null),
    productId: new UntypedFormControl(null, ApsValidators.required),
    startDate: new UntypedFormControl(null, ApsValidators.required),
    endDate: new UntypedFormControl(null, ApsValidators.required),
    companyId: new UntypedFormControl(null, ApsValidators.required),
    kilometrageStart: new UntypedFormControl(null, ApsValidators.requiredNumber),
    kilometrageEnd: new UntypedFormControl(null, ApsValidators.requiredNumber),
    client: new UntypedFormGroup({
      id: new UntypedFormControl(null),
      personType: new UntypedFormControl(null, ApsValidators.required),
      rfc: new UntypedFormControl(null, [ApsValidators.required, IvtValidators.rfc(RfcValidatorTypes.any)]),
      phone: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.phone]),
      email: new UntypedFormControl(null, [ApsValidators.required, ApsValidators.email]),
      salesPlace: new UntypedFormControl(null, ApsValidators.required),
      physicalInfo: new UntypedFormGroup({
        id: new UntypedFormControl(null),
        name: new UntypedFormControl(null, ApsValidators.required),
        lastName: new UntypedFormControl(null, ApsValidators.required),
        secondLastName: new UntypedFormControl(null, ApsValidators.required),
        birthDate: new UntypedFormControl(null, ApsValidators.required),
      }),
      moralInfo: new UntypedFormGroup({
        id: new UntypedFormControl(null),
        businessName: new UntypedFormControl(null, ApsValidators.required),
        constitutionDate: new UntypedFormControl(null, ApsValidators.required),
        adviser: new UntypedFormControl(null, ApsValidators.required),
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
export class GuaranteeFormComponent extends ApsFormComponent<Guarantee> implements OnChanges, AfterViewInit {
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

  get client(): UntypedFormGroup {
    return this.form.get('client') as UntypedFormGroup;
  }

  get vehicleForm(): UntypedFormGroup {
    return this.form.get('vehicle') as UntypedFormGroup;
  }

  get year$(): Observable<string> {
    return this.vehicleForm.get('year').valueChanges.pipe(startWith(this.vehicleForm.get('year').value));
  }

  get horsePower$(): Observable<string> {
    return this.vehicleForm.get('horsePower').valueChanges.pipe(startWith(this.vehicleForm.get('horsePower').value));
  }

  get addressForm(): UntypedFormGroup {
    return this.client.get('address') as UntypedFormGroup;
  }

  get physicalInfoForm(): UntypedFormGroup {
    return this.client.get('physicalInfo') as UntypedFormGroup;
  }

  get moralInfoForm(): UntypedFormGroup {
    return this.client.get('moralInfo') as UntypedFormGroup;
  }

  get isElegible(): boolean {
    return !this.currentVehicle || isVehicleElegible(this.currentVehicle);
  }

  get disableSubmit(): boolean {
    return !this.isElegible || !!this.error;
  }

  get showProductError(): boolean {
    return (
      !this.productOptions.length && this.vehicleForm.get('horsePower').value && this.vehicleForm.get('year').value
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
          moralInfo: this.item.client.moralInfo || {},
          physicalInfo: this.item.client.physicalInfo || {},
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
