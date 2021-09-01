import { Injectable } from '@angular/core';
import { ApsCollectionResponse } from '@arphase/common';
import { DefaultPersistenceResultHandler, EntityAction } from '@ngrx/data';
import { Action } from '@ngrx/store';

@Injectable()
export class ApsAdditionalPropertyPersistenceResultHandler<T = unknown> extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: ApsCollectionResponse<T>) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    return function (data: ApsCollectionResponse<T>) {
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
