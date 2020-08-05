import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Guarantee } from '@ivt/data';
import { GuaranteeDataService } from '@ivt/state';
import { IvtRowComponent } from '@ivt/ui';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-guarantee-row-container',
  templateUrl: './guarantee-row-container.component.html',
  styleUrls: ['./guarantee-row-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeRowContainerComponent extends IvtRowComponent<Guarantee> {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  constructor(private guaranteeDataService: GuaranteeDataService) {
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
}
