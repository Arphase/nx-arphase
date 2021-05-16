import { TestBed } from '@angular/core/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { IvtCollectionService } from './collection.service';

describe('IvtCollectionService', () => {
  let spectator: SpectatorService<IvtCollectionService<unknown>>;
  const createService = createServiceFactory({
    service: IvtCollectionService,
    providers: [
      { provide: String, useValue: '' },
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
