import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { RevisionRequestsComponent } from './revision-requests.component';

describe('RevisionRequestsComponent', () => {
  let spectator: Spectator<RevisionRequestsComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
