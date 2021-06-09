import { IvtCollectionResponseInfo } from '@innovatech/common/domain';
import {
  EntityAction,
  EntityActionPayload,
  EntityCollection,
  EntityCollectionReducerMethods,
  EntityDefinition,
  QueryParams,
} from '@ngrx/data';

export interface IvtEntityCollection<T> extends EntityCollection {
  queryParams: QueryParams;
  currentItem: T;
  loadingModify: boolean;
  info: IvtCollectionResponseInfo;
  hasMore: boolean;
}

export interface IvtEntityAction extends EntityAction {
  payload: IvtActionPayload;
}

export interface IvtActionPayload extends EntityActionPayload {
  queryParams: QueryParams;
  info: IvtCollectionResponseInfo;
}

export class AdditionalEntityCollectionReducerMethods<T> extends EntityCollectionReducerMethods<T> {
  constructor(public entityName: string, public definition: EntityDefinition<T>) {
    super(entityName, definition);
  }

  protected queryMany(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.queryMany(collection, action) as IvtEntityCollection<T>;
    return {
      ...entityCollection,
      queryParams: {
        ...entityCollection.queryParams,
        ...action.payload.data,
      },
    };
  }

  protected queryManySuccess(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    let entityCollection = super.queryManySuccess(collection, action) as IvtEntityCollection<T>;
    if (entityCollection.queryParams.resetList === String(true)) {
      entityCollection = super.queryManySuccess(super.removeAll(collection, action), action) as IvtEntityCollection<T>;
    }
    return {
      ...entityCollection,
      info: action.payload.info,
    };
  }

  protected queryByKeySuccess(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.queryByKeySuccess(collection, action) as IvtEntityCollection<T>;
    return {
      ...entityCollection,
      currentItem: action.payload.data,
      loading: false,
    };
  }

  protected queryByKeyError(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.queryByKeyError(collection, action) as IvtEntityCollection<T>;
    return {
      ...entityCollection,
      currentItem: null,
      loading: false,
    };
  }

  protected saveAddOne(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveAddOne(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: true };
  }

  protected saveAddOneSuccess(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveAddOneSuccess(collection, action) as IvtEntityCollection<T>;
    return {
      ...entityCollection,
      currentItem: action.payload.data,
      loadingModify: false,
    };
  }

  protected saveAddOneError(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveAddOneError(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected saveUpdateOne(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveUpdateOne(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: true };
  }

  protected saveUpdateOneSuccess(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveUpdateOneSuccess(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected saveUpdateOneError(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveUpdateOneError(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected saveDeleteOne(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveDeleteOne(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: true };
  }

  protected saveDeleteOneSuccess(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveDeleteOneSuccess(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected saveDeleteOneError(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    const entityCollection = super.saveDeleteOneError(collection, action) as IvtEntityCollection<T>;
    return { ...entityCollection, loadingModify: false };
  }

  protected removeOne(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    if (!action.payload.data) {
      return {
        ...collection,
        currentItem: null,
      };
    } else {
      return super.removeOne(collection, action) as IvtEntityCollection<T>;
    }
  }

  protected removeAll(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    return {
      ...collection,
      ...super.removeAll(collection, action),
      queryParams: null,
    };
  }
}
