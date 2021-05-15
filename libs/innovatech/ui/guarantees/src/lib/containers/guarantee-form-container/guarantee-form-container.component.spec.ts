import { RouterTestingModule } from '@angular/router/testing';
import {
  CompanyCollectionService,
  GuaranteeCollectionService,
  PermissionService,
  ProductCollectionService,
  VehicleCollectionService,
} from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';

import { GuaranteeFormContainerComponent } from './guarantee-form-container.component';

describe('GuaranteeFormContainerComponent', () => {
  let spectator: Spectator<GuaranteeFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeFormContainerComponent,
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
    mocks: [GuaranteeCollectionService, ProductCollectionService, VehicleCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
