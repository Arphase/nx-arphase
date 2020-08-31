import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guarantee, PersonTypes, Select } from '@ivt/data';
import { createAddressForm, IvtFormComponent } from '@ivt/ui';
import { CustomValidators, filterNil } from '@ivt/utils';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormComponent extends IvtFormComponent<Guarantee>
  implements OnInit, OnChanges {
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;
  personTypeOptions: Select[] = [
    { label: 'Física', value: PersonTypes[PersonTypes.physical] },
    { label: 'Moral', value: PersonTypes[PersonTypes.moral] },
  ];

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
      id: null,
      client: this.fb.group({
        id: null,
        personType: [PersonTypes[PersonTypes.physical], Validators.required],
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
        rfc: [null, [Validators.required, CustomValidators.rfc('any')]],
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
        year: [null, [Validators.required, Validators.min(2014)]],
        vin: [null, Validators.required],
        motorNumber: [null, Validators.required],
        serialNumber: [null, Validators.required],
        horsePower: [null, [Validators.required, Validators.max(400)]],
        kilometrageStart: [null, Validators.required],
        kilometrageEnd: [null, Validators.required],
      }),
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

    this.form.patchValue({
      "createdAt": "2020-08-24T18:24:35.813Z",
      "startDate": "2020-08-31T05:00:00.000Z",
      "endDate": "2020-08-31T05:00:00.000Z",
      "client": {
        "rfc": "MAVV951102312",
        "phone": "22222222222",
        "email": "victor@test.com",
        "salesPlace": "LOL",
        "physicalInfo": {
          name: 'test',
          lastName: 'test',
          secondLastName: 'test',
          "birthDate": "2020-08-24T18:24:35.813Z",
        },
        "address": {
          "zipCode": 64983,
          "country": "México",
          "state": "Nuevo León",
          "city": "Monterrey",
          "suburb": "El Refugio",
          "street": "bambu",
          "externalNumber": "1610",
          "internalNumber": null
        }
      },
      "vehicle": {
        "productType": "FORTE",
        "brand": "222",
        "model": "22",
        "version": "22",
        "year": 2222,
        "vin": "22",
        "motorNumber": "22",
        "serialNumber": "22",
        "horsePower": 222,
        "kilometrageStart": 22,
        "kilometrageEnd": 22222
      }
    })
  }

  ngOnInit() {
    this.moralInfoForm.disable();

    this.client.get('personType').valueChanges.pipe(
      filterNil(),
      takeUntil(this.destroy$)
    ).subscribe(value => this.personTypeChange(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue({
        ...this.item, client: {
          ...this.item.client,
          moralInfo: this.item.client.moralInfo || {},
          physicalInfo: this.item.client.physicalInfo || {}
        }
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
