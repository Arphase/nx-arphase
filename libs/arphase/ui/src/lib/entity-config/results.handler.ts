import { Injectable } from '@angular/core';
import { DefaultPersistenceResultHandler, EntityAction } from '@ngrx/data';
import { Action } from '@ngrx/store';

@Injectable()
export class ApsAdditionalPropertyPersistenceResultHandler extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    return function (data: any) {
      const action = actionHandler.call(this, data);
      if (action && data?.results) {
        action.payload.data = data.results;
      }
      if (action && data?.info) {
        action.payload.info = data.info;
      }
      return action;
    };
  }
}
