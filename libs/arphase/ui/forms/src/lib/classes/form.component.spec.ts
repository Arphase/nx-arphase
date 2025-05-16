import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ApsFormComponent } from './form.component';

describe('ApsFormComponent', () => {
  let spectator: Spectator<ApsFormComponent<unknown>>;
  const createComponent = createComponentFactory({
    component: ApsFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
