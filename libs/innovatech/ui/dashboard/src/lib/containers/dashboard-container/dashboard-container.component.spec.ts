import { IdentityFilterService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

import { DashboardContainerComponent } from './dashboard-container.component';

describe('DashboardContainerComponent', () => {
  let spectator: Spectator<DashboardContainerComponent>;
  const createComponent = createComponentFactory({
    component: DashboardContainerComponent,
    providers: [provideMockStore()],
    mocks: [IdentityFilterService],
    shallow: true
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});