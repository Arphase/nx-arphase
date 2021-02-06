import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guarantee, isVehicleElegible, PersonTypes, Select, Vehicle } from '@ivt/c-data';
import { filterNil, RfcValidatorTypes } from '@ivt/c-utils';
import { createAddressForm, IvtAddressFormComponent, IvtFormComponent, IvtValidators } from '@ivt/u-ui';
import { createVehicleForm, VehicleFormComponent } from '@ivt/u-vehicles';
import { omit } from 'lodash-es';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function createGuaranteeForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    productId: new FormControl(null),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
    companyId: new FormControl(null, Validators.required),
    kilometrageStart: new FormControl(null, IvtValidators.requiredNumber),
    kilometrageEnd: new FormControl(null, IvtValidators.requiredNumber),
    productType: new FormControl(null, Validators.required),
    client: new FormGroup({
      id: new FormControl(null),
      personType: new FormControl(null, Validators.required),
      rfc: new FormControl(null, [Validators.required, IvtValidators.rfc(RfcValidatorTypes.any)]),
      phone: new FormControl(null, [Validators.required, IvtValidators.phone]),
      email: new FormControl(null, [Validators.required, IvtValidators.email]),
      salesPlace: new FormControl(null, Validators.required),
      physicalInfo: new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        secondLastName: new FormControl(null, Validators.required),
        birthDate: new FormControl(null, Validators.required),
      }),
      moralInfo: new FormGroup({
        id: new FormControl(null),
        businessName: new FormControl(null, Validators.required),
        constitutionDate: new FormControl(null, Validators.required),
        adviser: new FormControl(null, Validators.required),
      }),
      address: createAddressForm(),
    }),
    vehicle: createVehicleForm(),
  });
}

@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormComponent extends IvtFormComponent<Guarantee> implements OnChanges, AfterViewInit {
  @ViewChild(IvtAddressFormComponent) addressFormComponent: IvtAddressFormComponent;
  @ViewChild(VehicleFormComponent) vehicleFormComponent: VehicleFormComponent;
  @Input() productOptions: Select[] = [];
  @Input() companyOptions: Select[] = [];
  @Input() disabledCompanyInput: boolean;
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;
  personTypeOptions: Select[] = [
    { label: 'Física', value: PersonTypes[PersonTypes.physical] },
    { label: 'Moral', value: PersonTypes[PersonTypes.moral] },
  ];
  companyId$: Observable<number>;
  @Output() verifyVin = new EventEmitter<string>();

  get client() {
    return this.form.get('client');
  }

  get vehicleForm() {
    return this.form.get('vehicle');
  }

  get addressForm(): FormGroup {
    return this.client.get('address') as FormGroup;
  }

  get physicalInfoForm(): FormGroup {
    return this.client.get('physicalInfo') as FormGroup;
  }

  get moralInfoForm(): FormGroup {
    return this.client.get('moralInfo') as FormGroup;
  }

  get isElegible(): boolean {
    return this.currentVehicle && isVehicleElegible(this.currentVehicle);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.form && this.form) {
      this.client
        .get('personType')
        .valueChanges.pipe(filterNil(), takeUntil(this.destroy$))
        .subscribe(value => this.personTypeChange(value));

      this.companyId$ = this.form.get('companyId').valueChanges;
    }

    if (changes.isEditable && this.item) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }

    if (changes.disabledCompanyInput) {
      this.disabledCompanyInput ? this.form.get('companyId').disable() : this.form.get('companyId').enable();
    }

    if (changes.vehicle && this.vehicle) {
      this.vehicleForm.patchValue(this.vehicle);
      this.vehicleForm.disable();
    }

    if (changes.currentVehicle) {
      if (this.currentVehicle) {
        this.vehicleForm.patchValue(omit(this.currentVehicle, 'vin'));
        this.vehicleForm.disable({ emitEvent: false });
        this.vehicleForm.get('vin').enable({ emitEvent: false });
      } else {
        this.vehicleForm.enable({ emitEvent: false });
        this.vehicleForm.get('id').patchValue(null);
      }
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

    this.stateChanged.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.addressFormComponent.markForCheck();
      this.vehicleFormComponent.markForCheck();
    });
  }

  personTypeChange(value: string): void {
    this.showPhysicalForm = value === PersonTypes[PersonTypes.physical];
    this.showMoralForm = value === PersonTypes[PersonTypes.moral];

    if (this.showPhysicalForm) {
      this.moralInfoForm.disable();
      this.physicalInfoForm.enable();
    } else {
      this.moralInfoForm.enable();
      this.physicalInfoForm.disable();
    }
  }
}
