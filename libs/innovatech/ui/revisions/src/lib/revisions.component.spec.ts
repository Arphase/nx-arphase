import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { RevisionsComponent } from './revisions.component';

describe('RevisionsComponent', () => {
  let spectator: Spectator<RevisionsComponent>;
  const createComponent = createComponentFactory({
    component: RevisionsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
