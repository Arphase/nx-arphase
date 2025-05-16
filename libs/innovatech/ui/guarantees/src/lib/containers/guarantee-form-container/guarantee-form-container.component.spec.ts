import { CompanyCollectionService } from '@innovatech/ui/companies/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';

import { provideRouter } from '@angular/router';
import { GuaranteeCollectionService } from '../../services/guarantee-collection.service';
import { GuaranteeFormContainerComponent } from './guarantee-form-container.component';

describe('GuaranteeFormContainerComponent', () => {
  let spectator: Spectator<GuaranteeFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeFormContainerComponent,
    shallow: true,
    providers: [
      provideRouter([]),
      provideMockStore(),
      {
        provide: PermissionService,
        useValue: { hasCreatePermission: () => of(true), hasUpdatePermission: () => of(true) },
      },
      { provide: CompanyCollectionService, useValue: { currentItem$: of({}), clearCache: jest.fn() } },
    ],
    mocks: [GuaranteeCollectionService, ProductCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
