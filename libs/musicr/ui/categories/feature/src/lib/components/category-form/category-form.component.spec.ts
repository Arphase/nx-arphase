import { MUSIC_REVOLUTION_CONFIGURATION } from '@musicr/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CategoryFormComponent } from './category-form.component';

describe('CategoryFormComponent', () => {
  let spectator: Spectator<CategoryFormComponent>;
  const createComponent = createComponentFactory({
    component: CategoryFormComponent,
    providers: [{ provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: {} }],
    mocks: [NzMessageService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
