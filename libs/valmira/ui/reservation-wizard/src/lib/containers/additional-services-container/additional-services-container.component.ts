import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { Reservation } from '@valmira/domain';
import { AdditionalProductCollectionService } from '@valmira/ui/additional-products/data';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { take } from 'rxjs/operators';

@Component({
  selector: 'vma-additional-services-container',
  templateUrl: './additional-services-container.component.html',
  styleUrls: ['./additional-services-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServicesContainerComponent implements OnInit {
  items$ = this.additionalProductCollectionService.entities$;
  item$ = this.reservationCollectionService.currentItem$;
  loading$ = this.reservationCollectionService.loadingModify$;

  constructor(
    private reservationCollectionService: ReservationCollectionService,
    private additionalProductCollectionService: AdditionalProductCollectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.additionalProductCollectionService.getWithQuery({ pageSize: String(50), onlyActives: String(true) });
  }

  submit(payload: Reservation): void {
    this.reservationCollectionService.entityActions$
      .pipe(ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS), take(1))
      .subscribe(() => this.router.navigate(['..', 'personal-data'], { relativeTo: this.route }));
    this.reservationCollectionService.update(payload);
  }
}
