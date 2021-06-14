import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { IvtDateFilterComponent } from './date-filter.component';

describe('IvtDateFilterComponent', () => {
  let spectator: Spectator<IvtDateFilterComponent>;
  const createComponent = createComponentFactory({
    component: IvtDateFilterComponent,
    imports: [ReactiveFormsModule, NzDropDownModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
