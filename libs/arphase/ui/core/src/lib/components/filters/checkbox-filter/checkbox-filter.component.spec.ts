import { ScrollingModule } from '@angular/cdk/scrolling';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { ApsCheckboxFilterComponent } from './checkbox-filter.component';

describe('ApsCheckboxFilterComponent', () => {
  let spectator: Spectator<ApsCheckboxFilterComponent>;
  const createComponent = createComponentFactory({
    component: ApsCheckboxFilterComponent,
    imports: [NzDropDownModule, ScrollingModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
