import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ApsDirtyFormGuard } from './dirty-form.guard';

describe('ApsDirtyFormGuard', () => {
  let spectator: SpectatorService<ApsDirtyFormGuard>;
  const createService = createServiceFactory({
    service: ApsDirtyFormGuard,
    mocks: [NzModalService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
