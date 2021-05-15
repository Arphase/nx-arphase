import { RouterTestingModule } from '@angular/router/testing';
import { PermissionService, RevisionCollectionService, VehicleCollectionService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';

import { RevisionFormContainerComponent } from './revision-form-container.component';

describe('RevisionFormContainerComponent', () => {
  let spectator: Spectator<RevisionFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionFormContainerComponent,
    imports: [RouterTestingModule],
    providers: [
      provideMockStore(),
      {
        provide: PermissionService,
        useValue: { hasCreatePermission: () => of(true), hasUpdatePermission: () => of(true) },
      },
    ],
    shallow: true,
    mocks: [RevisionCollectionService, VehicleCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
