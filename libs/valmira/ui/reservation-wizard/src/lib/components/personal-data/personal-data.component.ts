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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Customer, Reservation } from '@valmira/domain';
import { debounceTime } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'vma-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent extends ApsFormComponent<Reservation> implements OnInit, OnChanges {
  @Input() currentCustomer: Customer;
  form = new FormGroup({
    id: new FormControl(null),
    additionalComments: new FormControl(null),
    customer: new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
    }),
  });
  @Output() emailChanges = new EventEmitter<string>();

  get customerForm(): FormGroup {
    return this.form.get('customer') as FormGroup;
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
    if (changes.currentCustomer && this.currentCustomer?.id) {
      this.customerForm.get('id').patchValue(this.currentCustomer.id);
    }
  }
}
