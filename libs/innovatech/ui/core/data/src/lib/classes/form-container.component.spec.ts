import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { IvtCollectionService } from '../services/collection.service';

import { IvtFormContainerComponent } from './form-container.component';

describe('IvtFormContainerComponent', () => {
  let spectator: Spectator<IvtFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: IvtFormContainerComponent,
    shallow: true,
    mocks: [IvtCollectionService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
