import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AdditionalOptionsFormComponent } from './additional-options-form.component';

describe('AdditionalOptionsFormComponent', () => {
  let spectator: Spectator<AdditionalOptionsFormComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalOptionsFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
