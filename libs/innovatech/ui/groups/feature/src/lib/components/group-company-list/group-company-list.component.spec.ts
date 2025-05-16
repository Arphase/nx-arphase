import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
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
