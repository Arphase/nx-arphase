import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { Component } from '@angular/core';
import { IvtFolioPipe } from './folio.pipe';

describe('IvtFolioPipe', () => {
  @Component({
    selector: 'ivt-test',
    standalone: false,
  })
  class HostComponent {}

  let spectator: SpectatorPipe<IvtFolioPipe>;
  const createPipe = createPipeFactory({
    pipe: IvtFolioPipe,
    host: HostComponent,
  });

  beforeEach(() => (spectator = createPipe()));

  it('should create', () => {
    expect(spectator.element).toBeTruthy();
  });
});
