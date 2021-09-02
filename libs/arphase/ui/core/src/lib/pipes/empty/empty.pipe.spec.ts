import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { ApsEmptyPipe } from './empty.pipe';

describe('ApsEmptyPipe', () => {
  let spectator: SpectatorPipe<ApsEmptyPipe>;
  const createPipe = createPipeFactory({
    pipe: ApsEmptyPipe,
  });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
