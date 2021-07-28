import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui';
import { Place } from '@valmira/domain';

export function createPlaceForm(): FormGroup {
  return new FormGroup({
    name: new FormControl(null, ApsValidators.required),
    description: new FormControl(null, ApsValidators.required),
    capacity: new FormControl(null, ApsValidators.required),
    area: new FormControl(null, ApsValidators.required),
    weeklyPrice: new FormControl(null, ApsValidators.required),
    weekendPrice: new FormControl(null, ApsValidators.required),
    rooms: new FormControl(null, ApsValidators.required),
    beds: new FormControl(null, ApsValidators.required),
    services: new FormArray([]),
    categoryId: new FormControl(null, ApsValidators.required),
  });
}

@Component({
  selector: 'vma-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceFormComponent extends ApsFormComponent<Place> {
  get servicesFormArray(): FormArray {
    return this.form.get('services') as FormArray;
  }

  addService(): void {
    this.servicesFormArray.push(new FormControl('', ApsValidators.required));
  }

  removeService(index: number): void {
    this.servicesFormArray.removeAt(index);
  }
}
