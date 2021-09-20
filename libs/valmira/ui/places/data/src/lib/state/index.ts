import * as actions from './places.actions';
import { reducer } from './places.reducer';
import * as selectors from './places.selectors';

export const fromPlaces = { actions, reducer, selectors };
