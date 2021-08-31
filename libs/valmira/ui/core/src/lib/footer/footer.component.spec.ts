import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FooterComponent } from './footer.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>;
  const createComponent = createComponentFactory({
    component: FooterComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
