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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guarantee, PersonTypes, Select } from '@ivt/c-data';
import { filterNil, RfcValidatorTypes } from '@ivt/c-utils';
import { createAddressForm, IvtFormComponent, IvtValidators } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormComponent extends IvtFormComponent<Guarantee> implements OnChanges, AfterViewInit {
  @Input() productOptions: Select[] = [];
  @Input() companyOptions: Select[] = [];
  @Input() restrictedCompanyOptions: Select[] = [];
  @Input() canSelectCompany: boolean;
  @Input() companyId: number;
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;
  personTypeOptions: Select[] = [
    { label: 'Física', value: PersonTypes[PersonTypes.physical] },
    { label: 'Moral', value: PersonTypes[PersonTypes.moral] },
  ];
  currentCompanyOptions: Select[] = [];
  @Output() getCompanies = new EventEmitter<void>();
  @Output() getCompany = new EventEmitter<number>();

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
    const todayYear = new Date().getFullYear();
    this.form = this.fb.group({
      id: null,
      productId: null,
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      companyId: [null],
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
        phone: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        address: createAddressForm(),
        salesPlace: [null, Validators.required],
      }),
      vehicle: this.fb.group({
        id: null,
        productType: [null, Validators.required],
        brand: [null, Validators.required],
        model: [null, Validators.required],
        version: [null, Validators.required],
        year: [null, [Validators.required, Validators.min(todayYear - 20), Validators.max(todayYear + 1)]],
        vin: [null, Validators.required],
        motorNumber: [null, Validators.required],
        horsePower: [null, [Validators.required, Validators.max(400)]],
        kilometrageStart: [null, Validators.required],
        kilometrageEnd: [null, Validators.required],
      }),
    });
    this.client
      .get('personType')
      .valueChanges.pipe(filterNil(), takeUntil(this.destroy$))
      .subscribe(value => this.personTypeChange(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isEditable && this.item) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }

    if (changes.canSelectCompany) {
      this.canSelectCompany ? this.getCompanies.emit() : this.getCompany.emit(this.companyId);
      this.canSelectCompany ? this.form.get('companyId').enable() : this.form.get('companyId').disable();
    }

    if (changes.companyOptions || changes.restrictedCompanyOptions) {
      this.currentCompanyOptions = this.canSelectCompany ? this.companyOptions : this.restrictedCompanyOptions;
      if (!this.canSelectCompany && this.restrictedCompanyOptions[0]?.value) {
        this.form.get('companyId').patchValue(this.restrictedCompanyOptions[0].value);
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
