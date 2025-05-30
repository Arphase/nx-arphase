import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, ControlsOf } from '@arphase/ui/forms';
import { Customer } from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'mrl-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PersonalDataFormComponent extends ApsFormComponent<Partial<Customer>> implements OnChanges {
  @Input() currentCustomer: Customer;
  form = new FormGroup<ControlsOf<Partial<Customer>>>({
    id: new FormControl(null),
    firstName: new FormControl(null, ApsValidators.required),
    lastName: new FormControl(null, ApsValidators.required),
    email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
    phone: new FormControl(null, ApsValidators.required),
  });
  @Output() emailChanges = new EventEmitter<string>();

  constructor() {
    super();
    this.form
      .get('email')
      .valueChanges.pipe(debounceTime(1000), untilDestroyed(this))
      .subscribe(value => this.emailChanges.emit(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }

    if (changes.currentCustomer) {
      this.form.get('id').patchValue(this.currentCustomer?.id ?? null);
    }
  }
}
