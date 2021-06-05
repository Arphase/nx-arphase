import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { IvtPhonePipe } from './phone.pipe';

describe('IvtPhonePipe', () => {
  let spectator: SpectatorPipe<IvtPhonePipe>;
  const createPipe = createPipeFactory({
    pipe: IvtPhonePipe,
  });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
