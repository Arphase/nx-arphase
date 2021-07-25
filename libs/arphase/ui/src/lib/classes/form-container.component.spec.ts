import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ApsCollectionService } from '../services';
import { ApsFormContainerComponent } from './form-container.component';

describe('ApsFormContainerComponent', () => {
  let spectator: Spectator<ApsFormContainerComponent>;
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
