import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui';
import { Promocode } from '@valmira/domain';

export function createPromocodeForm(): FormGroup {
  return new FormGroup(
    {
      id: new FormControl(null),
      name: new FormControl(null, ApsValidators.required),
      startDate: new FormControl(null, ApsValidators.required),
      endDate: new FormControl(null, ApsValidators.required),
      amount: new FormControl(null, ApsValidators.required),
    },
    { validators: ApsValidators.dateLessThan('startDate', 'endDate') }
  );
}

@Component({
  selector: 'vma-promocode-form',
  templateUrl: './promocode-form.component.html',
  styleUrls: ['./promocode-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromocodeFormComponent extends ApsFormComponent<Promocode> implements OnChanges {
  get showDatesError(): boolean {
    return !!this.form?.errors && this.form?.get('startDate')?.touched && this.form?.get('endDate')?.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}
