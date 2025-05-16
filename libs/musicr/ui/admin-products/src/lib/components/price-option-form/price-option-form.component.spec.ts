import { MUSIC_REVOLUTION_CONFIGURATION } from '@musicr/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PriceOptionFormComponent } from './price-option-form.component';

describe('PriceOptionFormComponent', () => {
  let spectator: Spectator<PriceOptionFormComponent>;
  const createComponent = createComponentFactory({
    component: PriceOptionFormComponent,
    providers: [{ provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: {} }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
