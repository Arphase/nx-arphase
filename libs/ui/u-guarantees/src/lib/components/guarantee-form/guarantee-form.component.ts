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
import { ApsValidators } from '@arphase/ui';
import { Guarantee, isVehicleElegible, IvtCollectionResponseInfo, PersonTypes, Select, Vehicle } from '@ivt/c-data';
import { filterNil, RfcValidatorTypes } from '@ivt/c-utils';
import { createAddressForm, IvtFormComponent } from '@ivt/u-ui';
import { createVehicleForm } from '@ivt/u-vehicles';
import { QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function createGuaranteeForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    productId: new FormControl(null),
    startDate: new FormControl(null, ApsValidators.required),
    endDate: new FormControl(null, ApsValidators.required),
    companyId: new FormControl(null, ApsValidators.required),
    kilometrageStart: new FormControl(null, ApsValidators.requiredNumber),
    kilometrageEnd: new FormControl(null, ApsValidators.requiredNumber),
    productType: new FormControl(null, ApsValidators.required),
    client: new FormGroup({
      id: new FormControl(null),
      personType: new FormControl(null, ApsValidators.required),
      rfc: new FormControl(null, [ApsValidators.required, ApsValidators.rfc(RfcValidatorTypes.any)]),
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

@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormComponent extends IvtFormComponent<Guarantee> implements OnChanges, AfterViewInit {
  @Input() productOptions: Select[] = [];
  @Input() companyOptions: Select[] = [];
  @Input() showCompanyInput: boolean;
  @Input() vehicle: Vehicle;
  @Input() currentVehicle: Vehicle;
  @Input() error: string;
  @Input() companiesInfo: IvtCollectionResponseInfo;
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;
  personTypeOptions: Select[] = [
    { label: 'Física', value: PersonTypes[PersonTypes.physical] },
    { label: 'Moral', value: PersonTypes[PersonTypes.moral] },
  ];
  companyId$: Observable<number>;
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<QueryParams>();

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
    return !this.currentVehicle || isVehicleElegible(this.currentVehicle);
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

    if (changes.showCompanyInput) {
      this.showCompanyInput ? this.form.get('companyId').enable() : this.form.get('companyId').disable();
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

  getMoreCompanies(): void {
    this.getCompanies.emit({ pageIndex: String(this.companiesInfo.pageIndex + 1), resetList: String(false) });
  }

  searchCompanies(text: string): void {
    this.getCompanies.emit({ text, resetList: String(true) });
  }
}
