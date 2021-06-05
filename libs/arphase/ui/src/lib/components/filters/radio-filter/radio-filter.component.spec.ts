import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { IvtRadioFilterComponent } from './radio-filter.component';

describe('IvtRadioFilterComponent', () => {
  let spectator: Spectator<IvtRadioFilterComponent>;
  const createComponent = createComponentFactory({
    component: IvtRadioFilterComponent,
    imports: [NzDropDownModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
