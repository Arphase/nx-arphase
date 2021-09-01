import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let spectator: Spectator<LandingComponent>;
  const createComponent = createComponentFactory({
    component: LandingComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
