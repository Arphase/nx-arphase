import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PlaceCollectionService } from '@valmira/ui/places/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { PhotoCollectionService } from '../../services/photo-collection.service';
import { PlaceFormContainerComponent } from './place-form-container.component';

describe('PlaceFormContainerComponent', () => {
  let spectator: Spectator<PlaceFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: PlaceFormContainerComponent,
    imports: [RouterTestingModule],
    shallow: true,
    mocks: [PlaceCollectionService, PhotoCollectionService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
