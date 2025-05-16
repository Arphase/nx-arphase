import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  const createComponent = createComponentFactory({
    component: DashboardComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
