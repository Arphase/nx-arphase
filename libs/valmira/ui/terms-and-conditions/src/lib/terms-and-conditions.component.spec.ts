import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TermsAndConditionsComponent } from './terms-and-conditions.component';

describe('TermsAndConditionsComponent', () => {
  let spectator: Spectator<TermsAndConditionsComponent>;
  const createComponent = createComponentFactory({
    component: TermsAndConditionsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
