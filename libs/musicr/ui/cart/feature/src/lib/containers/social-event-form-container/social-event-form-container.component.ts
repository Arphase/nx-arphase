import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialEvent } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';
import { first } from 'rxjs/operators';

@Component({
  selector: 'mrl-social-event-form-container',
  templateUrl: './social-event-form-container.component.html',
  styleUrls: ['./social-event-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialEventFormContainerComponent {
  socialEvent$ = this.cartService.socialEvent$;
  orderType$ = this.cartService.orderType$;

  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute) {}

  submit(socialEvent: SocialEvent): void {
    this.socialEvent$
      .pipe(first(socialEvent => !!socialEvent))
      .subscribe(() =>
        this.router.navigate(['..', 'personal-data'], { relativeTo: this.route, queryParamsHandling: 'merge' })
      );

    this.cartService.saveSocialEvent(socialEvent);
  }
}
