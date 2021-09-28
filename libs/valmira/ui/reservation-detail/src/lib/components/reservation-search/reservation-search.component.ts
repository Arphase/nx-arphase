import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/core';

import { SearchReservationPayload } from '../../models/search-reservation-payload.model';

@Component({
  selector: 'vma-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationSearchComponent extends ApsFormComponent<SearchReservationPayload> {
  form = new FormGroup({
    id: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
  });

  get idError(): boolean {
    const control = this.form?.get('id');
    return control?.errors && control?.touched;
  }

  get emailError(): boolean {
    const control = this.form?.get('email');
    return control?.errors && control?.touched;
  }
}
