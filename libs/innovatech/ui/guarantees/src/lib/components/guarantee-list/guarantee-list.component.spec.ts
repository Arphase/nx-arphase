import { IvtEmptyPipe, IvtFolioPipe } from '@ivt/u-ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { GuaranteeListComponent } from './guarantee-list.component';

describe('GuaranteeListComponent', () => {
  let spectator: Spectator<GuaranteeListComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeListComponent,
    imports: [NzDropDownModule],
    declarations: [MockPipe(IvtFolioPipe), MockPipe(IvtEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
