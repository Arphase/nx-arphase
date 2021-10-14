import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@arphase/ui/core';
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
  loading$ = this.loadingService.loadingElse$;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  submit(socialEvent: SocialEvent): void {
    this.socialEvent$
      .pipe(first(socialEvent => !!socialEvent?.name))
      .subscribe(() => this.router.navigate(['..', 'personal-data'], { relativeTo: this.route }));

    this.cartService.saveSocialEvent(socialEvent);
  }
}
