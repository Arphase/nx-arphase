import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeepPartial } from '@arphase/common';
import { ApsFormComponent, ControlsOf } from '@arphase/ui/forms';
import { Promocode, Reservation } from '@valmira/domain';

@Component({
  selector: 'vma-reservation-wizard',
  templateUrl: './reservation-wizard.component.html',
  styleUrls: ['./reservation-wizard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationWizardComponent extends ApsFormComponent<DeepPartial<Reservation>> implements OnChanges {
  @Input() promocodeNotFound: boolean;
  @Input() isInConfirmation: boolean;
  @Input() disablePaymentMethod: boolean;
  @Input() disableConfirmation: boolean;

  form = new FormGroup({
    promocode: new FormGroup({
      name: new FormControl<string>(null, Validators.required),
    }),
  }) as FormGroup<ControlsOf<DeepPartial<Reservation>>>;

  get promocode(): DeepPartial<Promocode> {
    return this.item?.promocode;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item?.promocode?.id) {
      this.form.get('promocode.name').patchValue(this.promocode.name);
    }
  }
}
