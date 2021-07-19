import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { ApsRadioFilterComponent } from './radio-filter.component';

describe('ApsRadioFilterComponent', () => {
  let spectator: Spectator<ApsRadioFilterComponent>;
  const createComponent = createComponentFactory({
    component: ApsRadioFilterComponent,
    imports: [NzDropDownModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
