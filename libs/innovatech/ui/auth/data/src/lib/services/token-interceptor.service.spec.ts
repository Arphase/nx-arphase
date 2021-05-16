import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  let spectator: SpectatorService<TokenInterceptorService>;
  const createService = createServiceFactory({
    service: TokenInterceptorService,
    providers: [provideMockStore()],
    mocks: [AuthService, NzMessageService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
