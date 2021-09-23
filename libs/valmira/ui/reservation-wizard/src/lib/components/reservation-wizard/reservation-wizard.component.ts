import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/core';
import { Place, Promocode, Reservation } from '@valmira/domain';

@Component({
  selector: 'vma-reservation-wizard',
  templateUrl: './reservation-wizard.component.html',
  styleUrls: ['./reservation-wizard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationWizardComponent extends ApsFormComponent implements OnChanges {
  @Input() item: Reservation;
  @Input() promocodeNotFound: boolean;

  form = new FormGroup({
    promocode: new FormControl(null, Validators.required),
  });

  get place(): Place {
    return this.item?.place;
  }

  get promocode(): Promocode {
    return this.item?.promocode;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.promocode?.id) {
      this.form.get('promocode').patchValue(this.promocode.name);
    }
  }
}
