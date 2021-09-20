import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { ApsPhonePipe } from './phone.pipe';

describe('ApsPhonePipe', () => {
  let spectator: SpectatorPipe<ApsPhonePipe>;
  const createPipe = createPipeFactory({ pipe: ApsPhonePipe });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
