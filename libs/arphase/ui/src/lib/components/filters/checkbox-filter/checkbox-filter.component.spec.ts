import { ScrollingModule } from '@angular/cdk/scrolling';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { IvtCheckboxFilterComponent } from './checkbox-filter.component';

describe('IvtCheckboxFilterComponent', () => {
  let spectator: Spectator<IvtCheckboxFilterComponent>;
  const createComponent = createComponentFactory({
    component: IvtCheckboxFilterComponent,
    imports: [NzDropDownModule, ScrollingModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
