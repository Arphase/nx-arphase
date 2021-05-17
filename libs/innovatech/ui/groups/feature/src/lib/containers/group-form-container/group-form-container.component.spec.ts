import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createGroupForm } from '../../functions/group-form.functions';
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
