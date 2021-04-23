import { RouterTestingModule } from '@angular/router/testing';
import { PermissionService, RevisionCollectionService, VehicleCollectionService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RevisionFormContainerComponent } from './revision-form-container.component';

describe('RevisionFormContainerComponent', () => {
  let spectator: Spectator<RevisionFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionFormContainerComponent,
    imports: [RouterTestingModule],
    providers: [provideMockStore()],
    shallow: true,
    mocks: [RevisionCollectionService, VehicleCollectionService, NzMessageService, PermissionService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
