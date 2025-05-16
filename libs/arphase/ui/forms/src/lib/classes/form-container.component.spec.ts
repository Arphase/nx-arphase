import { ApsCollectionService } from '@arphase/ui/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ApsFormContainerComponent } from './form-container.component';

describe('ApsFormContainerComponent', () => {
  let spectator: Spectator<ApsFormContainerComponent<unknown>>;
  const createComponent = createComponentFactory({
    component: ApsFormContainerComponent,
    shallow: true,
    mocks: [ApsCollectionService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
