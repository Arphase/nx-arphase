import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { MUSIC_REVOLUTION_CONFIGURATION } from '../config';
import { HttpProxyService } from './http-proxy.service';

describe('HttpProxyService', () => {
  let spectator: SpectatorService<HttpProxyService>;
  const createService = createServiceFactory({
    service: HttpProxyService,
    providers: [{ provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: {} }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
