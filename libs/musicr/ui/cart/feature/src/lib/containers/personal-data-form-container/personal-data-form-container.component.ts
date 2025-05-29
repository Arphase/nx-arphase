import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';
import { first } from 'rxjs/operators';

@Component({
  selector: 'mrl-personal-data-form-container',
  templateUrl: './personal-data-form-container.component.html',
  styleUrls: ['./personal-data-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PersonalDataFormContainerComponent {
  item$ = this.cartService.personalData$;
  currentCustomer$ = this.cartService.currentCustomer$;
  loading$ = this.cartService.loading$;
  order$ = this.cartService.order$;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  emailChanges(email: string): void {
    this.cartService.getCustomerByEmail(email);
  }

  submit(personalData: Customer): void {
    this.cartService.order$
      .pipe(first(order => !!order?.id))
      .subscribe(() =>
        this.router.navigate(['..', 'confirmation'], { relativeTo: this.route, queryParamsHandling: 'merge' }),
      );

    this.cartService.createOrder(personalData);
  }
}
