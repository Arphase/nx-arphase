import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PlaceCollectionService } from '../../services/place-collection.service';
import { PlaceFormContainerComponent } from './place-form-container.component';

describe('PlaceFormContainerComponent', () => {
  let spectator: Spectator<PlaceFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: PlaceFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [PlaceCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});