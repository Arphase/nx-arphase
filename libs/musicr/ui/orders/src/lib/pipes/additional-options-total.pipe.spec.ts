import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { AdditionalOptionsTotalPipe } from './additional-options-total.pipe';

describe('AdditionalOptionsTotalPipe', () => {
  let spectator: SpectatorPipe<AdditionalOptionsTotalPipe>;
  const createPipe = createPipeFactory({ pipe: AdditionalOptionsTotalPipe });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
