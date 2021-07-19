import { ApsEmptyPipe } from '@arphase/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { GroupCompanyListComponent } from './group-company-list.component';

describe('GroupCompanyListComponent', () => {
  let spectator: Spectator<GroupCompanyListComponent>;
  const createComponent = createComponentFactory({
    component: GroupCompanyListComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
