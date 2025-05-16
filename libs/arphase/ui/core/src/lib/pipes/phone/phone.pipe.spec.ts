import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { ApsPhonePipe } from './phone.pipe';
import { Component } from '@angular/core';

describe('ApsPhonePipe', () => {
  @Component({
    selector: 'aps-test',
    standalone: false,
  })
  class HostComponent {}

  let spectator: SpectatorPipe<ApsPhonePipe>;
  const createPipe = createPipeFactory({ pipe: ApsPhonePipe, host: HostComponent });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
