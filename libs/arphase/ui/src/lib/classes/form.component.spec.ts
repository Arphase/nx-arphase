import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ApsFormComponent } from './form.component';

describe('ApsFormComponent', () => {
  let spectator: Spectator<ApsFormComponent>;
  const createComponent = createComponentFactory({
    component: ApsFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
