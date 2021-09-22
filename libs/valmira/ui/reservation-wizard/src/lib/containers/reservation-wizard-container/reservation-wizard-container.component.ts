import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { filter, map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'vma-reservation-wizard-container',
  templateUrl: './reservation-wizard-container.component.html',
  styleUrls: ['./reservation-wizard-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationWizardContainerComponent implements OnInit {
  item$ = this.reservationCollectionService.currentItem$;

  constructor(private reservationCollectionService: ReservationCollectionService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.reservationCollectionService.removeOneFromCache(null);
    this.route.paramMap
      .pipe(
        untilDestroyed(this),
        filter(params => !!params.get('id')),
        map(params => params.get('id'))
      )
      .subscribe(id => this.reservationCollectionService.getByKey(id));
  }
}
