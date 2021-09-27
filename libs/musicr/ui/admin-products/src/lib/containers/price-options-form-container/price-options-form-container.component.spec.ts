import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PhotoCollectionService } from '../../services/photo-collection.service';
import { PriceOptionCollectionService } from '../../services/price-option-collection.service';
import { PriceOptionsFormContainerComponent } from './price-options-form-container.component';

describe('PriceOptionsFormContainerComponent', () => {
  let spectator: Spectator<PriceOptionsFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: PriceOptionsFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [PriceOptionCollectionService, PhotoCollectionService, NzModalService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
