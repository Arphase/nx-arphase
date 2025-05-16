import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ApsFeatureLayoutComponent } from './feature-layout.component';

describe('ApsFeatureLayoutComponent', () => {
  let spectator: Spectator<ApsFeatureLayoutComponent>;
  const createComponent = createComponentFactory({
    component: ApsFeatureLayoutComponent,
    imports: [RouterTestingModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
