import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { Reservation } from '@valmira/domain';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { take } from 'rxjs/operators';

@Component({
  selector: 'vma-personal-data-container',
  templateUrl: './personal-data-container.component.html',
  styleUrls: ['./personal-data-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataContainerComponent {
  item$ = this.reservatiionCollectionService.currentItem$;

  constructor(
    private reservatiionCollectionService: ReservationCollectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submit(payload: Reservation) {
    this.reservatiionCollectionService.entityActions$
      .pipe(ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS), take(1))
      .subscribe(() => this.router.navigate(['..', 'payment-method'], { relativeTo: this.route }));
    this.reservatiionCollectionService.update(payload);
  }
}
