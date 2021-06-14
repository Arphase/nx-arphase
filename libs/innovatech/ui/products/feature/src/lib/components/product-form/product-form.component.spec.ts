import { HttpClientModule } from '@angular/common/http';
import { ProductDataService } from '@innovatech/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let spectator: Spectator<ProductFormComponent>;
  const createComponent = createComponentFactory({
    component: ProductFormComponent,
    imports: [HttpClientModule],
    shallow: true,
    mocks: [ProductDataService, NzModalService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
