import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { Observable, of } from 'rxjs';

import { ReservationWizardContainerComponent } from './reservation-wizard-container.component';

describe('ReservationWizardContainerComponent', () => {
  let spectator: Spectator<ReservationWizardContainerComponent>;
  const actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: ReservationWizardContainerComponent,
    imports: [RouterTestingModule],
    providers: [
      provideMockStore(),
      provideMockActions(() => actions$),
      { provide: ReservationCollectionService, useValue: { currentItem$: of({}), removeOneFromCache: jest.fn() } },
    ],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
