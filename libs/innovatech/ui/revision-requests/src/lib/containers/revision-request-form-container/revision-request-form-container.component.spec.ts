import { RouterTestingModule } from '@angular/router/testing';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { VehicleCollectionService } from '@innovatech/ui/vehicles/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RevisionRequestCollectionService } from '../../services/revision-request-collection.service';
import { RevisionRequestFormContainerComponent } from './revision-request-form-container.component';

describe('RevisionRequestFormContainerComponent', () => {
  let spectator: Spectator<RevisionRequestFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestFormContainerComponent,
    imports: [RouterTestingModule],
    providers: [provideMockStore()],
    shallow: true,
    mocks: [RevisionRequestCollectionService, NzMessageService, PermissionService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
