import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { IvtAutocompleteComponent } from './autocomplete.component';

describe('IvtAutocompleteComponent', () => {
  let spectator: Spectator<IvtAutocompleteComponent>;
  const createComponent = createComponentFactory({
    component: IvtAutocompleteComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
