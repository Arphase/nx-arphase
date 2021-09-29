import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { RedDayPipe } from './red-day.pipe';

describe('RedDayPipe', () => {
  let spectator: SpectatorPipe<RedDayPipe>;
  const createPipe = createPipeFactory(RedDayPipe);

  beforeEach(() => (spectator = createPipe()));

  it('create an instance', () => {
    expect(spectator.element).toBeTruthy();
  });
});
