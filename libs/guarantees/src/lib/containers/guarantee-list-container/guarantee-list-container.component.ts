import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Guarantee } from '@ivt/data';
import { GuaranteeCollectionService, GuaranteeDataService } from '@ivt/state';
import { IvtListContainerComponent } from '@ivt/ui';
import { BehaviorSubject } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListContainerComponent extends IvtListContainerComponent<
Guarantee
> {
  loadingPaymentOrderSubject = new BehaviorSubject<boolean>(false);
  loadingPaymentOrder$ = this.loadingPaymentOrderSubject.asObservable();

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    private guaranteeDataService: GuaranteeDataService
  ) {
    super(guaranteeCollectionService);
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
