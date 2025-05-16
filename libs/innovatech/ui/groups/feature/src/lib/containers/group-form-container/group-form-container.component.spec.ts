import { RouterTestingModule } from '@angular/router/testing';
import { GroupCollectionService } from '@innovatech/ui/groups/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createGroupForm } from '../../functions/group-form.functions';
import { GroupFormService } from '../../services/group-form.service';
import { GroupFormContainerComponent } from './group-form-container.component';

describe('GroupFormContainerComponent', () => {
  let spectator: Spectator<GroupFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: GroupFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    componentProviders: [{ provide: GroupFormService, useValue: { form: createGroupForm() } }],
    mocks: [GroupCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
