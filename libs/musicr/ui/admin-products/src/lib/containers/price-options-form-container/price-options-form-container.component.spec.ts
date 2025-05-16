import { RouterTestingModule } from '@angular/router/testing';
import { PhotoCollectionService, PriceOptionCollectionService } from '@musicr/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzModalService } from 'ng-zorro-antd/modal';

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
