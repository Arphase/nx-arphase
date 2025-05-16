import { AdditionalOptionCollectionService } from '@musicr/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AdditionalOptionsFormContainerComponent } from './additional-options-form-container.component';

describe('AdditionalOptionsFormContainerComponent', () => {
  let spectator: Spectator<AdditionalOptionsFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalOptionsFormContainerComponent,
    shallow: true,
    mocks: [AdditionalOptionCollectionService, NzModalService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
