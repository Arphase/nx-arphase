import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';
import { Promocode } from '@valmira/domain';

export function createPromocodeForm(): UntypedFormGroup {
  return new UntypedFormGroup(
    {
      id: new UntypedFormControl(null),
      name: new UntypedFormControl(null, ApsValidators.required),
      startDate: new UntypedFormControl(null, ApsValidators.required),
      endDate: new UntypedFormControl(null, ApsValidators.required),
      amount: new UntypedFormControl(null, ApsValidators.required),
    },
    { validators: ApsValidators.dateLessThan('startDate', 'endDate') }
  );
}

@Component({
    selector: 'vma-promocode-form',
    templateUrl: './promocode-form.component.html',
    styleUrls: ['./promocode-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
