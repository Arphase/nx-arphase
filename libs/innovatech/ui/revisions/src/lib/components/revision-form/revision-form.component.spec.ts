import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { RevisionFormComponent } from './revision-form.component';

describe('RevisionFormComponent', () => {
  let spectator: Spectator<RevisionFormComponent>;
  const createComponent = createComponentFactory({
    component: RevisionFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
