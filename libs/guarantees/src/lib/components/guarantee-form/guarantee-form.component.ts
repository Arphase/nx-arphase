import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CustomValidators } from '@innovatech/utils';

@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormComponent implements OnInit {
  // @Input() loading: boolean;
  @Output() getGuaranteePdf = new EventEmitter<any>();
  form: FormGroup;
  showPhysicalForm = true;
  showMoralForm = false;
  physicalControls = ['name', 'lastName', 'secondLastName', 'birthDate'];
  moralControls = [
    'businessName',
    'constitutionDate',
    'distributor',
    'adviser',
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      client: this.fb.group({
        personType: [null, Validators.required],
        name: [null, Validators.required],
        lastName: [null, Validators.required],
        secondLastName: [null, Validators.required],
        businessName: [null, Validators.required],
        birthDate: [null, Validators.required],
        constitutionDate: [null, Validators.required],
        rfc: [null, [Validators.required, CustomValidators.rfc('any')]],
        phone: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        zipCode: [null, Validators.required],
        state: [null, Validators.required],
        city: [null, Validators.required],
        suburb: [null, Validators.required],
        street: [null, Validators.required],
        streetNumber: [null, Validators.required],
        distributor: [null, Validators.required],
        adviser: [null, Validators.required],
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
        guaranteeStartDate: [null, Validators.required],
        guaranteeEndDate: [null, Validators.required],
        kilometrage: [null, Validators.required],
        kilometrageEnd: [null, Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.moralControls.forEach((control) => this.client.get(control).disable());
    this.client.get('personType').patchValue('1');
  }

  personTypeChange(personType) {
    const value = personType.value;
    this.showPhysicalForm = value === '1';
    this.showMoralForm = value === '2';

    let disableControls;
    let enableControls;

    if (this.showPhysicalForm) {
      disableControls = this.moralControls;
      enableControls = this.physicalControls;
    } else {
      disableControls = this.physicalControls;
      enableControls = this.moralControls;
    }

    disableControls.forEach((control) => this.client.get(control).disable());
    enableControls.forEach((control) => this.client.get(control).enable());
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (control.hasError('max')) {
      return 'El número no debe ser mayor a 400';
    }

    if (control.hasError('min')) {
      return 'El año debe ser mayor o igual a 2014';
    }

    if (control.hasError('rfc')) {
      return 'Debe tener formato de RFC';
    }

    return control.hasError('email') ? 'Debe tener formato de correo' : '';
  }

  cleanValues() {
    this.showPhysicalForm
      ? this.moralControls.forEach((control) =>
          this.client.get(control).patchValue(null)
        )
      : this.physicalControls.forEach((control) =>
          this.client.get(control).patchValue(null)
        );
  }

  submit() {
    if (this.form.valid || this.form.disabled) {
      this.cleanValues();
      this.getGuaranteePdf.emit(this.values);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
