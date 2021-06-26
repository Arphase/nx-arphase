import { ApsEmptyPipe } from '@arphase/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { VehicleListComponent } from './vehicle-list.component';

describe('VehicleListComponent', () => {
  let spectator: Spectator<VehicleListComponent>;
  const createComponent = createComponentFactory({
    component: VehicleListComponent,
    imports: [NzDropDownModule],
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
