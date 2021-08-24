import { PhotoCollectionService } from './photo-collection.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

describe('PhotoCollectionService', () => {
  let spectator: SpectatorService<PhotoCollectionService>;
  const createService = createServiceFactory({
    service: PhotoCollectionService,
    providers: [
      {
        provide: EntityCollectionServiceElementsFactory,
        useValue: {
          create: () => ({
            dispatcher: {},
            selectors$: { collection$: of({}), entities$: of({}) },
          }),
        },
      },
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
