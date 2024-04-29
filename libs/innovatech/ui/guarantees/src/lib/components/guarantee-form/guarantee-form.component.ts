import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Address, DeepPartial } from '@arphase/common';
import { ApsFormComponent, ControlsOf, enableControl } from '@arphase/ui/forms';
import { filterNil } from '@arphase/ui/utils';
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
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QueryParams } from '@ngrx/data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { personTypeOptions } from './guarantee-form.constants';

@UntilDestroy()
@Component({
  selector: 'ivt-guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class GuaranteeFormComponent
  extends ApsFormComponent<DeepPartial<Guarantee>, DeepPartial<Guarantee>>
  implements OnChanges
{
  @Input() productOptions: NzSelectOptionInterface[] = [];
  @Input() vehicle: Vehicle;
  @Input() error: string;
  @Input() showCompanyInput: boolean;
  @Input() groupId: number;
  showPhysicalForm = true;
  showMoralForm = false;
  personTypes = PersonTypes;
  personTypeOptions = personTypeOptions;
  companyId$: Observable<number>;
  @Output() verifyVin = new EventEmitter<string>();
  @Output() getCompanies = new EventEmitter<QueryParams>();

  get client(): FormGroup<ControlsOf<Client>> {
    return this.form.get('client') as FormGroup<ControlsOf<Client>>;
  }

  get vehicleForm(): FormGroup<ControlsOf<Vehicle>> {
    return this.form.get('vehicle') as FormGroup<ControlsOf<Vehicle>>;
  }

  get year$(): Observable<number> {
    return this.vehicleForm.get('year').valueChanges.pipe(startWith(this.values.vehicle.year));
  }

  get horsePower$(): Observable<number> {
    return this.vehicleForm.get('horsePower').valueChanges.pipe(startWith(this.values.vehicle.horsePower));
  }

  get addressForm(): FormGroup<ControlsOf<Address>> {
    return this.client.get('address') as FormGroup<ControlsOf<Address>>;
  }

  get physicalInfoForm(): FormGroup<ControlsOf<PhysicalPerson>> {
    return this.client.get('physicalInfo') as FormGroup<ControlsOf<PhysicalPerson>>;
  }

  get moralInfoForm(): FormGroup<ControlsOf<MoralPerson>> {
    return this.client.get('moralInfo') as FormGroup<ControlsOf<MoralPerson>>;
  }

  get isElegible(): boolean {
    return !this.vehicle || isVehicleElegible(this.vehicle);
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
      enableControl(this.form, this.isEditable);
    }

    if (changes.showCompanyInput) {
      enableControl(this.form.get('companyId'), this.showCompanyInput, { emitEvent: false });
    }

    if (changes.item && this.item) {
      this.form.patchValue({
        ...this.item,
        client: {
          ...this.item.client,
          moralInfo: this.item.client.moralInfo ?? {},
          physicalInfo: this.item.client.physicalInfo ?? {},
        },
      });
    }

    if (changes.vehicle && this.vehicle?.companyId && !this.values.companyId) {
      this.form.get('companyId').patchValue(this.vehicle.companyId);
    }
  }

  personTypeChange(value: string): void {
    this.showPhysicalForm = value === PersonTypes.physical;
    this.showMoralForm = value === PersonTypes.moral;

    if (this.isEditable) {
      enableControl(this.physicalInfoForm, this.showPhysicalForm);
      enableControl(this.moralInfoForm, !this.showPhysicalForm);
    }
  }
}
