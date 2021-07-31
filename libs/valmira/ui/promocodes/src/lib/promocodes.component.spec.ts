import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PromocodesComponent } from './promocodes.component';

describe('PromocodesComponent', () => {
  let spectator: Spectator<PromocodesComponent>;
  const createComponent = createComponentFactory({
    component: PromocodesComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
