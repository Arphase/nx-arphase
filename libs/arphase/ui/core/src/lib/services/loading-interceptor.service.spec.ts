import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { LoadingInterceptorService } from './loading-interceptor.service';
import { LoadingService } from './loading.service';

describe('LoadingInterceptorService', () => {
  let spectator: SpectatorService<LoadingInterceptorService>;
  const createService = createServiceFactory({
    service: LoadingInterceptorService,
    mocks: [LoadingService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
