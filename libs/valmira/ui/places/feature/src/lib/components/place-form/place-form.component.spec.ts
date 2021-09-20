import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { VALMIRA_CONFIGURATION } from '@valmira/ui/core';

import { PlaceFormComponent } from './place-form.component';

describe('PlaceFormComponent', () => {
  let spectator: Spectator<PlaceFormComponent>;
  const createComponent = createComponentFactory({
    component: PlaceFormComponent,
    providers: [{ provide: VALMIRA_CONFIGURATION, useValue: {} }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
