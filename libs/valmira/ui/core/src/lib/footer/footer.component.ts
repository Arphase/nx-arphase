import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filterNil } from '@arphase/ui/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { selectUrl } from '../router';

@Component({
  selector: 'vma-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  showReserveLink$ = this.store.pipe(
    select(selectUrl),
    filterNil(),
    map(url => !url.includes('search') && !url.includes('place') && !url.includes('reservation'))
  );
  constructor(private store: Store) {}
}
