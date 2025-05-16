import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PromocodeCollectionService } from '@valmira/ui/promocodes/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PromocodeFormContainerComponent } from './promocode-form-container.component';

describe('PromocodeFormContainerComponent', () => {
  let spectator: Spectator<PromocodeFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: PromocodeFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [PromocodeCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
