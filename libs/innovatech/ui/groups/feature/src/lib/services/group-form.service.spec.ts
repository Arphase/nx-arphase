import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { NzModalService } from 'ng-zorro-antd/modal';

import { GroupFormService } from './group-form.service';

describe('GroupFormService', () => {
  let spectator: SpectatorService<GroupFormService>;
  const createService = createServiceFactory({
    service: GroupFormService,
    mocks: [NzModalService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
