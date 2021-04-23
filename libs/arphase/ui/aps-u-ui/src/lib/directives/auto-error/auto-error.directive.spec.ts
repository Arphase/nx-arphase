import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { ApsAutoErrorDirective } from './auto-error.directive';

describe('ApsAutoErrorDirective', () => {
  let spectator: SpectatorDirective<ApsAutoErrorDirective>;
  const createDirective = createDirectiveFactory({
    directive: ApsAutoErrorDirective,
  });

  beforeEach(() => {
    spectator = createDirective(`<div apsAutoError></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
