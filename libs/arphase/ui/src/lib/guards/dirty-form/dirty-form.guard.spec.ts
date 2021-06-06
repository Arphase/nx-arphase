import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { NzModalService } from 'ng-zorro-antd/modal';

import { IvtDirtyFormGuard } from './dirty-form.guard';

describe('IvtDirtyFormGuard', () => {
  let spectator: SpectatorService<IvtDirtyFormGuard>;
  const createService = createServiceFactory({
    service: IvtDirtyFormGuard,
    mocks: [NzModalService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
