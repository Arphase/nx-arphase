import { GuaranteeCollectionService } from '@ivt/u-state';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { GuaranteeResolverService } from './guarantee-resolver.service';

describe('GuaranteeResolverService', () => {
  let spectator: SpectatorService<GuaranteeResolverService>;
  const createService = createServiceFactory({
    service: GuaranteeResolverService,
    mocks: [GuaranteeCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
