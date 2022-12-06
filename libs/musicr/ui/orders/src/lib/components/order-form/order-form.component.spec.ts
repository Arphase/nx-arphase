import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { OrderFormComponent } from './order-form.component';
import { createOrderForm } from './order-form.constants';

describe('OrderFormComponent', () => {
  let spectator: Spectator<OrderFormComponent>;
  const createComponent = createComponentFactory({
    component: OrderFormComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { form: createOrderForm() } });
  });
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
