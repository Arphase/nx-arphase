import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockPipe } from 'ng-mocks';

import { RedDayPipe } from '../../pipes/red-day.pipe';
import { PlaceDetailComponent } from './place-detail.component';

describe('PlaceDetailComponent', () => {
  let spectator: Spectator<PlaceDetailComponent>;
  const createComponent = createComponentFactory({
    component: PlaceDetailComponent,
    declarations: [MockPipe(RedDayPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
