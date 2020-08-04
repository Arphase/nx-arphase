import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Guarantee, GuaranteeStatus } from '@ivt/data';
import { IvtRowComponent } from '@ivt/ui';
import { Observable, Subject, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-guarantee-row',
  templateUrl: './guarantee-row.component.html',
  styleUrls: ['./guarantee-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeRowComponent extends IvtRowComponent<Guarantee>
  implements OnInit {
  statusLabels: Record<GuaranteeStatus, string> = {
    [GuaranteeStatus.cancelled]: 'Cancelada',
    [GuaranteeStatus.expired]: 'Caducada',
    [GuaranteeStatus.outstanding]: 'Pendiente de pago',
    [GuaranteeStatus.paid]: 'Pagada',
  };
  backgroundClasses: Record<GuaranteeStatus, string> = {
    [GuaranteeStatus.cancelled]: 'bg-alert',
    [GuaranteeStatus.expired]: 'bg-info',
    [GuaranteeStatus.outstanding]: 'bg-warning text-white',
    [GuaranteeStatus.paid]: 'bg-success',
  };
  guaranteeStatus = GuaranteeStatus;
  visibleStatus$: Observable<boolean>;
  showStatusSubject = new Subject();
  showStatus$ = this.showStatusSubject.asObservable();

  ngOnInit() {
    this.visibleStatus$ = this.showStatus$.pipe(
      switchMap(() =>
        timer(0, 1000).pipe(
          take(2),
          map((x) => x % 2 === 0)
        )
      )
    );
  }
}
