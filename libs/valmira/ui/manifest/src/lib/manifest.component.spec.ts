import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ManifestComponent } from './manifest.component';

describe('ManifestComponent', () => {
  let spectator: Spectator<ManifestComponent>;
  const createComponent = createComponentFactory({
    component: ManifestComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
