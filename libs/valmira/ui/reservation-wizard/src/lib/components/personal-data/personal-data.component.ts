import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Customer, Reservation } from '@valmira/domain';
import { debounceTime } from 'rxjs/operators';

@UntilDestroy()
@Component({
    selector: 'vma-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PersonalDataComponent extends ApsFormComponent<Reservation> implements OnInit, OnChanges {
  @Input() customer: Customer;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    additionalComments: new UntypedFormControl(null),
    customer: new UntypedFormGroup({
      id: new UntypedFormControl(null),
      firstName: new UntypedFormControl(null, Validators.required),
      lastName: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      phone: new UntypedFormControl(null, Validators.required),
    }),
  });
  @Output() emailChanges = new EventEmitter<string>();

  get customerForm(): UntypedFormGroup {
    return this.form.get('customer') as UntypedFormGroup;
  }

  get firstNameError(): boolean {
    const control = this.customerForm?.get('firstName');
    return control?.errors && control?.touched;
  }

  get lastNameError(): boolean {
    const control = this.customerForm?.get('lastName');
    return control?.errors && control?.touched;
  }

  get emailError(): boolean {
    const control = this.customerForm?.get('email');
    return control?.errors && control?.touched;
  }

  get phoneError(): boolean {
    const control = this.customerForm?.get('phone');
    return control?.errors && control?.touched;
  }

  ngOnInit() {
    this.customerForm
      .get('email')
      .valueChanges.pipe(debounceTime(1000), untilDestroyed(this))
      .subscribe(email => this.emailChanges.emit(email));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
    if (changes.customer && this.customer?.id) {
      this.customerForm.get('id').patchValue(this.customer.id);
    }
  }
}
