import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { SumAllPlacesPipe } from '../../pipes/sum-all-places.pipe';
import { PlaceSearchFormComponent } from './place-search-form.component';

describe('PlaceSearchFormComponent', () => {
  let spectator: Spectator<PlaceSearchFormComponent>;
  const createComponent = createComponentFactory({
    component: PlaceSearchFormComponent,
    declarations: [MockPipe(SumAllPlacesPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
