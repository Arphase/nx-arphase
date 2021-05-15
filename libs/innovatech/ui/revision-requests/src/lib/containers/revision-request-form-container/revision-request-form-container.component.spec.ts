import { RouterTestingModule } from '@angular/router/testing';
import { PermissionService, RevisionRequestCollectionService, VehicleCollectionService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RevisionRequestFormContainerComponent } from './revision-request-form-container.component';

describe('RevisionRequestFormContainerComponent', () => {
  let spectator: Spectator<RevisionRequestFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestFormContainerComponent,
    imports: [RouterTestingModule],
    providers: [provideMockStore()],
    shallow: true,
    mocks: [RevisionRequestCollectionService, VehicleCollectionService, NzMessageService, PermissionService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
