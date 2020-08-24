import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Guarantee, GuaranteeStatus } from '@ivt/data';
import { GuaranteeCollectionService, GuaranteeDataService } from '@ivt/state';
import { IvtRowComponent } from '@ivt/ui';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { statusLabels } from '../../components/guarantee-row/guarantee-row.constants';

@Component({
  selector: 'ivt-guarantee-row-container',
  templateUrl: './guarantee-row-container.component.html',
  styleUrls: ['./guarantee-row-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeRowContainerComponent extends IvtRowComponent<Guarantee> {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  loadingStatusChangeSubject = new BehaviorSubject<boolean>(false);
  loadingStatusChange$ = this.loadingStatusChangeSubject.asObservable();

  loadingPaymentOrderSubject = new BehaviorSubject<boolean>(false);
  loadingPaymentOrder$ = this.loadingPaymentOrderSubject.asObservable();

  statusLabels = statusLabels;

  constructor(
    private guaranteeCollectiionService: GuaranteeCollectionService,
    private guaranteeDataService: GuaranteeDataService,
    private toastr: ToastrService
  ) {
    super();
  }

  downloadPdf(id: number): void {
    this.loadingSubject.next(true);
    this.guaranteeDataService
      .getGuaranteePdf(id)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  changeStatus(guarantee: Partial<Guarantee>): void {
    this.loadingStatusChangeSubject.next(true);
    this.guaranteeCollectiionService
      .update(guarantee)
      .pipe(
        take(1),
        finalize(() => this.loadingStatusChangeSubject.next(false))
      )
      .subscribe(() =>
        this.toastr.success(
          `La garantía con folio ${guarantee.id} ahora está ${statusLabels[
            GuaranteeStatus[guarantee.status]
          ].toLowerCase()}`
        )
      );
  }

  generatePaymentOrder(guaranteeIds: number[]): void {
    this.loadingPaymentOrderSubject.next(true);
    this.guaranteeDataService.getPaymentOrder(guaranteeIds).pipe(
      take(1),
      finalize(() => this.loadingPaymentOrderSubject.next(false))
    )
      .subscribe();
  }
}
