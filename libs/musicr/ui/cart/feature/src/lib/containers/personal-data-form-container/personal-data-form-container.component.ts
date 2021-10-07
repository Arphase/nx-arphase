import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';

@Component({
  selector: 'mrl-personal-data-form-container',
  templateUrl: './personal-data-form-container.component.html',
  styleUrls: ['./personal-data-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataFormContainerComponent {
  item$ = this.cartService.personalData$;
  currentCustomer$ = this.cartService.currentCustomer$;

  constructor(private cartService: CartService) {}

  emailChanges(email: string): void {
    this.cartService.getCustomerByEmail(email);
  }

  submit(personalData: Customer): void {
    this.cartService.savePersonalData(personalData);
  }
}
