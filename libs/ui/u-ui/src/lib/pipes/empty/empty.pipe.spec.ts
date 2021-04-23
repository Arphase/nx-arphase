import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { IvtEmptyPipe } from './empty.pipe';

describe('IvtEmptyPipe', () => {
  let spectator: SpectatorPipe<IvtEmptyPipe>;
  const createPipe = createPipeFactory({
    pipe: IvtEmptyPipe,
  });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
