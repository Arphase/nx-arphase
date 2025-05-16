import { ApsEmptyPipe } from '@arphase/ui/core';
import { BasePermissionDirective, NoPermissionDirective } from '@innovatech/ui/permissions/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockDirective, MockPipe } from 'ng-mocks';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { VehicleListComponent } from './vehicle-list.component';

describe('VehicleListComponent', () => {
  let spectator: Spectator<VehicleListComponent>;
  const createComponent = createComponentFactory({
    component: VehicleListComponent,
    imports: [NzDropDownModule],
    declarations: [
      MockPipe(ApsEmptyPipe),
      MockDirective(BasePermissionDirective),
      MockDirective(NoPermissionDirective),
    ],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
