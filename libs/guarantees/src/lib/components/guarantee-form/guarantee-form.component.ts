import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Guarantee, PersonTypes } from '@ivt/data';
import { IvtFormComponent } from '@ivt/ui';
import { CustomValidators } from '@ivt/utils';

@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormComponent extends IvtFormComponent<Guarantee>
  implements OnInit {
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;

  get values() {
    return this.form.getRawValue();
  }

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
      client: this.fb.group({
        personType: [PersonTypes.physical, Validators.required],
        physicalInfo: this.fb.group({
          name: [null, Validators.required],
          lastName: [null, Validators.required],
          secondLastName: [null, Validators.required],
          birthDate: [null, Validators.required],
        }),
        moralInfo: this.fb.group({
          businessName: [null, Validators.required],
          constitutionDate: [null, Validators.required],
          distributor: [null, Validators.required],
          adviser: [null, Validators.required],
        }),
        rfc: [null, [Validators.required, CustomValidators.rfc('any')]],
        phone: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        address: this.fb.group({
          zipCode: [null, Validators.required],
          country: [null, Validators.required],
          state: [null, Validators.required],
          city: [null, Validators.required],
          suburb: [null, Validators.required],
          street: [null, Validators.required],
          streetNumber: [null, Validators.required],
        }),
        salesPlace: [null, Validators.required],
      }),
      vehicle: this.fb.group({
        productType: [null, Validators.required],
        brand: [null, Validators.required],
        model: [null, Validators.required],
        version: [null, Validators.required],
        year: [null, [Validators.required, Validators.min(2014)]],
        invoiceDate: [null, Validators.required],
        vin: [null, Validators.required],
        motorNumber: [null, Validators.required],
        serialNumber: [null, Validators.required],
        horsePower: [null, [Validators.required, Validators.max(400)]],
        kilometrageStart: [null, Validators.required],
        kilometrageEnd: [null, Validators.required],
      }),
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.moralInfoForm.disable();
    this.form.patchValue({
      client: {
        personType: 1,
        physicalInfo: {
          name: 'TEST',
          lastName: 'TEST',
          secondLastName: 'AA',
          birthDate: '2020-08-05T05:00:00.000Z',
        },
        moralInfo: {
          businessName: null,
          constitutionDate: null,
          distributor: null,
          adviser: null,
        },
        rfc: 'MAVV951102311',
        phone: '2',
        email: 'test@test.com',
        address: {
          zipCode: '64983',
          country: 'M',
          state: 'W',
          city: 'W',
          suburb: 'W',
          street: 'W',
          streetNumber: '22',
        },
        salesPlace: 'LOL',
      },
      vehicle: {
        productType: 'P',
        brand: 'P',
        model: 'P',
        version: 'P',
        year: '2020',
        invoiceDate: '2020-08-05T05:00:00.000Z',
        vin: '22',
        motorNumber: '2',
        serialNumber: '22',
        horsePower: '222',
        kilometrageStart: '2',
        kilometrageEnd: '22',
      },
      startDate: '2020-08-05T05:00:00.000Z',
      endDate: '2020-08-05T05:00:00.000Z',
      amount: '300',
    });
  }

  personTypeChange(personType: MatRadioChange): void {
    const value = personType.value;
    this.showPhysicalForm = value === PersonTypes.physical;
    this.showMoralForm = value === PersonTypes.moral;

    if (this.showPhysicalForm) {
      this.moralInfoForm.disable();
      this.physicalInfoForm.enable();
    } else {
      this.moralInfoForm.enable();
      this.physicalInfoForm.disable();
    }
  }
}
