import { Action, createReducer, on } from '@ngrx/store';

import * as GroupsActions from './groups.actions';
import { GroupsState } from './groups.state';

export const initialState: GroupsState = {
  products: [],
};

const vehiclesReducer = createReducer(
  initialState,
  on(GroupsActions.getGroupProductsSuccess, (state, action) => ({
    ...state,
    products: action.payload,
  })),
  on(GroupsActions.clearGroupsStore, (state, action) => initialState),
);

export function reducer(state: GroupsState, action: Action) {
  return vehiclesReducer(state, action);
}
