import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PlaceSearchFormComponent } from './place-search-form.component';

describe('PlaceSearchFormComponent', () => {
  let spectator: Spectator<PlaceSearchFormComponent>;
  const createComponent = createComponentFactory({
    component: PlaceSearchFormComponent,
    imports: [RouterTestingModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
