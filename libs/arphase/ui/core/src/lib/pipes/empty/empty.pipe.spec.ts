import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { Component } from '@angular/core';
import { ApsEmptyPipe } from './empty.pipe';

describe('ApsEmptyPipe', () => {
  @Component({
    selector: 'aps-test',
    standalone: false,
  })
  class HostComponent {}

  let spectator: SpectatorPipe<ApsEmptyPipe>;
  const createPipe = createPipeFactory({
    pipe: ApsEmptyPipe,
    host: HostComponent,
  });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
