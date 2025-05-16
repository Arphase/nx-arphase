import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { FrequentQuestionsComponent } from './frequent-questions.component';

describe('ApsFrequentQuestionsComponent', () => {
  let spectator: Spectator<FrequentQuestionsComponent>;
  const createComponent = createComponentFactory({
    component: FrequentQuestionsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
