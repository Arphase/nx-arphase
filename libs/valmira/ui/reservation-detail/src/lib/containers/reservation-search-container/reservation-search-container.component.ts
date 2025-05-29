import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@arphase/ui/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { SearchReservationPayload } from '../../models/search-reservation-payload.model';
import { getReservationDetail, getReservationDetailSuccess } from '../../state/reservation-detail.actions';

@Component({
  selector: 'vma-reservation-search-container',
  templateUrl: './reservation-search-container.component.html',
  styleUrls: ['./reservation-search-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReservationSearchContainerComponent {
  loading$ = this.loadingService.loading$;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private actions$: Actions,
  ) {}

  submit(payload: SearchReservationPayload): void {
    this.actions$
      .pipe(ofType(getReservationDetailSuccess), take(1))
      .subscribe(({ reservation }) =>
        this.router.navigate([reservation.id], { relativeTo: this.route, queryParams: { email: payload.email } }),
      );

    this.store.dispatch(getReservationDetail({ payload }));
  }
}
