import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { Component } from '@angular/core';
import { RedDayPipe } from './red-day.pipe';

describe('RedDayPipe', () => {
  @Component({
    selector: 'vma-test',
    standalone: false,
  })
  class HostComponent {}

  let spectator: SpectatorPipe<RedDayPipe>;
  const createPipe = createPipeFactory({ pipe: RedDayPipe, host: HostComponent });

  beforeEach(() => (spectator = createPipe()));

  it('create an instance', () => {
    expect(spectator.element).toBeTruthy();
  });
});
