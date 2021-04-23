import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

import { IvtFolioPipe } from './folio.pipe';

describe('IvtFolioPipe', () => {
  let spectator: SpectatorPipe<IvtFolioPipe>;
  const createPipe = createPipeFactory({
    pipe: IvtFolioPipe,
  });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
