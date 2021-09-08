import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AdditionalOptionCollectionService } from '../../services/additional-option-collection.service';
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
