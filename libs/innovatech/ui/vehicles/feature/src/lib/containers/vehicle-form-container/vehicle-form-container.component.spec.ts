import { PermissionService } from '@innovatech/ui/permissions/data';
import { fromVehicles, VehicleCollectionService } from '@innovatech/ui/vehicles/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';

import { provideRouter } from '@angular/router';
import { fromAuth } from '@innovatech/ui/auth/data';
import { CompanyCollectionService } from '@innovatech/ui/companies/data';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { VehicleFormContainerComponent } from './vehicle-form-container.component';

describe('VehicleFormContainerComponent', () => {
  let spectator: Spectator<VehicleFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: VehicleFormContainerComponent,
    shallow: true,
    providers: [
      provideRouter([]),
      provideMockStore({
        initialState: fromVehicles.initialState,
        selectors: [
          { selector: fromAuth.selectors.getAuthUserCompanyIdState, value: 1 },
          { selector: fromVehicles.selectors.getVehiclesVehicleState, value: {} },
          { selector: fromVehicles.selectors.getVehiclesErrorState, value: null },
        ],
      }),
      {
        provide: PermissionService,
        useValue: { hasCreatePermission: () => of(true), hasUpdatePermission: () => of(true) },
      },
      { provide: VehicleCollectionService, useValue: { currentItem$: of({}) } },
      { provide: ProductCollectionService, useValue: { entities$: of([]) } },
      { provide: CompanyCollectionService, useValue: { currentItem$: of({}) } },
    ],
    mocks: [NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
