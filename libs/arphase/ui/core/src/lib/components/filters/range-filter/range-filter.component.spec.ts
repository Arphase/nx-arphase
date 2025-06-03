import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { NgxMaskDirective } from 'ngx-mask';
import { ApsRangeFilterComponent } from './range-filter.component';

describe('ApsRangeFilterComponent', () => {
  let spectator: Spectator<ApsRangeFilterComponent>;
  const createComponent = createComponentFactory({
    component: ApsRangeFilterComponent,
    overrideComponents: [[ApsRangeFilterComponent, { remove: { imports: [NgxMaskDirective] } }]],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
