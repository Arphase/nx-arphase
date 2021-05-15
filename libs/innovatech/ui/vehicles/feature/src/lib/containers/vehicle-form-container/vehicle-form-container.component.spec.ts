import { RouterTestingModule } from '@angular/router/testing';
import { CompanyCollectionService, PermissionService, VehicleCollectionService } from '@ivt/u-state';
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
      { provide: CompanyCollectionService, useValue: { store: of({}), selectors: { selectCollection: '' } } },
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
