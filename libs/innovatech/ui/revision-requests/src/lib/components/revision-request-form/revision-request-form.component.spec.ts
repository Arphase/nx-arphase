import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { RevisionRequestFormComponent } from './revision-request-form.component';

describe('RevisionRequestFormComponent', () => {
  let spectator: Spectator<RevisionRequestFormComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
