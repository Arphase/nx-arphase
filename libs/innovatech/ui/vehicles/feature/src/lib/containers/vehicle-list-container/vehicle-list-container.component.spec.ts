import { RouterTestingModule } from '@angular/router/testing';
import { VehicleCollectionService, VehicleDataService } from '@innovatech/ui/vehicles/data-access';
import { IdentityFilterService, PermissionService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { VehicleListContainerComponent } from './vehicle-list-container.component';

describe('VehicleListContainerComponent', () => {
  let spectator: Spectator<VehicleListContainerComponent>;
  const createComponent = createComponentFactory({
    component: VehicleListContainerComponent,
    shallow: true,
    imports: [RouterTestingModule],
    mocks: [
      VehicleCollectionService,
      VehicleDataService,
      NzModalService,
      NzMessageService,
      IdentityFilterService,
      PermissionService,
    ],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});