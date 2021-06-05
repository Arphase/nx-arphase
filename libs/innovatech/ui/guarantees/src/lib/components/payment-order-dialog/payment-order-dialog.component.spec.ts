import { ReactiveFormsModule } from '@angular/forms';
import { IvtFolioPipe } from '@innovatech/ui/core/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { PaymentOrderDialogComponent } from './payment-order-dialog.component';

describe('PaymentOrderDialogComponent', () => {
  let spectator: Spectator<PaymentOrderDialogComponent>;
  const createComponent = createComponentFactory({
    component: PaymentOrderDialogComponent,
    imports: [ReactiveFormsModule],
    declarations: [MockPipe(IvtFolioPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
