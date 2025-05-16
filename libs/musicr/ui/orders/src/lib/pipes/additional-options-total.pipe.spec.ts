import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { Component } from '@angular/core';
import { AdditionalOptionsTotalPipe } from './additional-options-total.pipe';

describe('AdditionalOptionsTotalPipe', () => {
  @Component({
    selector: 'mrl-test',
    standalone: false,
  })
  class HostComponent {}

  let spectator: SpectatorPipe<AdditionalOptionsTotalPipe>;
  const createPipe = createPipeFactory({ pipe: AdditionalOptionsTotalPipe, host: HostComponent });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
