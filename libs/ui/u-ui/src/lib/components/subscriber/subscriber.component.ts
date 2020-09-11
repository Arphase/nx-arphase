import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ivt-subscriber',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtSubscriberComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
