import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { ApsDateFilterComponent } from './date-filter.component';

describe('ApsDateFilterComponent', () => {
  let spectator: Spectator<ApsDateFilterComponent>;
  const createComponent = createComponentFactory({
    component: ApsDateFilterComponent,
    imports: [ReactiveFormsModule, NzDropDownModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
