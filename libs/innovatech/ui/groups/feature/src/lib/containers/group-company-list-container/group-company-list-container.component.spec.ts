import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { createGroupForm } from '../../functions/group-form.functions';
import { GroupFormService } from '../../services/group-form.service';
import { GroupCompanyListContainerComponent } from './group-company-list-container.component';

describe('GroupCompanyListContainerComponent', () => {
  let spectator: Spectator<GroupCompanyListContainerComponent>;
  const createComponent = createComponentFactory({
    component: GroupCompanyListContainerComponent,
    shallow: true,
    providers: [{ provide: GroupFormService, useValue: { form: createGroupForm() } }],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
