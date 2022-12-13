import { RouterTestingModule } from '@angular/router/testing';
import { CoreService } from '@musicr/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzIconService } from 'ng-zorro-antd/icon';

import { StoreWrapperComponent } from './store-wrapper.component';

describe('StoreWrapperComponent', () => {
  let spectator: Spectator<StoreWrapperComponent>;
  const createComponent = createComponentFactory({
    component: StoreWrapperComponent,
    imports: [RouterTestingModule],
    mocks: [CoreService, NzIconService],
    detectChanges: false,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
