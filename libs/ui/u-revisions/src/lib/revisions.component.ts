import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IvtState, selectUrl } from '@ivt/u-state';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivt-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionsComponent {
  isInVehicles$ = this.store.pipe(
    select(selectUrl),
    map(url => url.includes('vehicles'))
  );
  constructor(private store: Store<IvtState>) {}
}
