import { RouterTestingModule } from '@angular/router/testing';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { VehicleCollectionService } from '@innovatech/ui/vehicles/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';

import { VehicleFormContainerComponent } from './vehicle-form-container.component';

describe('VehicleFormContainerComponent', () => {
  let spectator: Spectator<VehicleFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: VehicleFormContainerComponent,
    shallow: true,
    imports: [RouterTestingModule],
    providers: [
      provideMockStore(),
      {
        provide: PermissionService,
        useValue: { hasCreatePermission: () => of(true), hasUpdatePermission: () => of(true) },
      },
    ],
    mocks: [VehicleCollectionService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
