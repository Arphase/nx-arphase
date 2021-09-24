import { ApsCollectionResponseInfo } from '@arphase/common';
import {
  EntityAction,
  EntityActionPayload,
  EntityCollection,
  EntityCollectionReducerMethods,
  EntityDefinition,
  QueryParams,
} from '@ngrx/data';

export interface ApsEntityCollection<T> extends EntityCollection {
  queryParams: QueryParams;
  currentItem: T;
  loadingModify: boolean;
  info: ApsCollectionResponseInfo;
}

export interface ApsEntityAction extends EntityAction {
  payload: ApsActionPayload;
}

export interface ApsActionPayload extends EntityActionPayload {
  queryParams: QueryParams;
  info: ApsCollectionResponseInfo;
}

export class AdditionalEntityCollectionReducerMethods<T> extends EntityCollectionReducerMethods<T> {
  constructor(public entityName: string, public definition: EntityDefinition<T>) {
    super(entityName, definition);
  }

  protected queryMany(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.queryMany(collection, action) as ApsEntityCollection<T>;
    return {
      ...entityCollection,
      queryParams: {
        ...entityCollection.queryParams,
        ...action.payload.data,
      },
    };
  }

  protected queryManySuccess(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    let entityCollection = super.queryManySuccess(collection, action) as ApsEntityCollection<T>;
    if (entityCollection.queryParams.resetList === String(true)) {
      entityCollection = super.queryManySuccess(super.removeAll(collection, action), action) as ApsEntityCollection<T>;
    }
    return {
      ...entityCollection,
      info: action.payload.info,
    };
  }

  protected queryByKeySuccess(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.queryByKeySuccess(collection, action) as ApsEntityCollection<T>;
    return {
      ...entityCollection,
      currentItem: action.payload.data,
      loading: false,
    };
  }

  protected queryByKeyError(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.queryByKeyError(collection, action) as ApsEntityCollection<T>;
    return {
      ...entityCollection,
      currentItem: null,
      loading: false,
    };
  }

  protected saveAddOne(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveAddOne(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, loadingModify: true };
  }

  protected saveAddOneSuccess(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveAddOneSuccess(collection, action) as ApsEntityCollection<T>;
    return {
      ...entityCollection,
      currentItem: action.payload.data,
      loadingModify: false,
    };
  }

  protected saveAddOneError(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveAddOneError(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected saveUpdateOne(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveUpdateOne(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, loadingModify: true };
  }

  protected saveUpdateOneSuccess(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveUpdateOneSuccess(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, currentItem: action.payload.data.changes, loadingModify: false };
  }

  protected saveUpdateOneError(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveUpdateOneError(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected saveDeleteOne(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveDeleteOne(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, loadingModify: true };
  }

  protected saveDeleteOneSuccess(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveDeleteOneSuccess(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected saveDeleteOneError(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    const entityCollection = super.saveDeleteOneError(collection, action) as ApsEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected removeOne(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    if (!action.payload.data) {
      return {
        ...collection,
        currentItem: null,
      };
    } else {
      return super.removeOne(collection, action) as ApsEntityCollection<T>;
    }
  }

  protected updateOne(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    return {
      ...(super.updateOne(collection, action) as ApsEntityCollection<T>),
      currentItem: action.payload.data.changes,
    };
  }

  protected removeAll(collection: ApsEntityCollection<T>, action: ApsEntityAction): ApsEntityCollection<T> {
    return {
      ...collection,
      ...super.removeAll(collection, action),
      queryParams: null,
    };
  }
}
