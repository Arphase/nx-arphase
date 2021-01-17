import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guarantee, PersonTypes, Select } from '@ivt/c-data';
import { filterNil, RfcValidatorTypes } from '@ivt/c-utils';
import { createAddressForm, IvtAddressFormComponent, IvtFormComponent, IvtValidators } from '@ivt/u-ui';
import { createVehicleForm, VehicleFormComponent } from '@ivt/u-vehicles';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;
  personTypeOptions: Select[] = [
    { label: 'Física', value: PersonTypes[PersonTypes.physical] },
    { label: 'Moral', value: PersonTypes[PersonTypes.moral] },
  ];
  companyId$: Observable<number>;

  get client() {
    return this.form.get('client');
  }

  get vehicle() {
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

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      productId: null,
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      companyId: [null],
      kilometrageStart: [null, Validators.required],
      kilometrageEnd: [null, Validators.required],
      productType: [null, Validators.required],
      client: this.fb.group({
        id: null,
        personType: [null, Validators.required],
        physicalInfo: this.fb.group({
          id: null,
          name: [null, Validators.required],
          lastName: [null, Validators.required],
          secondLastName: [null, Validators.required],
          birthDate: [null, Validators.required],
        }),
        moralInfo: this.fb.group({
          id: null,
          businessName: [null, Validators.required],
          constitutionDate: [null, Validators.required],
          adviser: [null, Validators.required],
        }),
        rfc: [null, [Validators.required, IvtValidators.rfc(RfcValidatorTypes.any)]],
        phone: [null, [Validators.required, IvtValidators.phone]],
        email: [null, [Validators.required, IvtValidators.email]],
        address: createAddressForm(),
        salesPlace: [null, Validators.required],
      }),
      vehicle: createVehicleForm(),
    });
    this.client
      .get('personType')
      .valueChanges.pipe(filterNil(), takeUntil(this.destroy$))
      .subscribe(value => this.personTypeChange(value));

    this.companyId$ = this.form.get('companyId').valueChanges;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isEditable && this.item) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }

    if (changes.disabledCompanyInput) {
      this.disabledCompanyInput ? this.form.get('companyId').disable() : this.form.get('companyId').enable();
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
