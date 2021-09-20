import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PriceOptionsFormComponent } from './price-options-form.component';

describe('PriceOptionsFormComponent', () => {
  let spectator: Spectator<PriceOptionsFormComponent>;
  const createComponent = createComponentFactory({
    component: PriceOptionsFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
