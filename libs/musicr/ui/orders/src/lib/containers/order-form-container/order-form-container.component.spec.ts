import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';

import { OrderCollectionService } from '../../services/order-collection.service';
import { OrderFormService } from '../../services/order-form.service';
import { OrderFormContainerComponent } from './order-form-container.component';

describe('OrderFormContainerComponent', () => {
  let spectator: Spectator<OrderFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: OrderFormContainerComponent,
    shallow: true,
    imports: [RouterTestingModule],
    mocks: [OrderCollectionService, NzMessageService],
    componentMocks: [OrderFormService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
