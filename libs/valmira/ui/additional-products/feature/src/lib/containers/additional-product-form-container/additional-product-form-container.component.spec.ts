import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AdditionalProductCollectionService } from '@valmira/ui/additional-products/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AdditionalProductFormContainerComponent } from './additional-product-form-container.component';

describe('AdditionalProductFormContainerComponent', () => {
  let spectator: Spectator<AdditionalProductFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalProductFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [AdditionalProductCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
