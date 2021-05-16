import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { INNOVATECH_CONFIGURATION } from '../../ui-state-config';
import { HttpProxyService } from './http-proxy.service';

describe('HttpProxyService', () => {
  let spectator: SpectatorService<HttpProxyService>;
  const createService = createServiceFactory({
    service: HttpProxyService,
    providers: [{ provide: INNOVATECH_CONFIGURATION, useValue: {} }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
