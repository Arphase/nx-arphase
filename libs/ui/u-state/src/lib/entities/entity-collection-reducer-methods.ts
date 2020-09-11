import { DEFAULT_LIMIT_SIZE, IvtQueryParams } from '@ivt/c-data';
import {
  EntityAction,
  EntityActionPayload,
  EntityCollection,
  EntityCollectionReducerMethods,
  EntityDefinition,
} from '@ngrx/data';

export interface IvtEntityCollection<T = any> extends EntityCollection {
  queryParams: IvtQueryParams;
  hasMore: boolean;
  currentItem: T;
}

export interface IvtEntityAction<T = any> extends EntityAction {
  payload: IvtActionPayload<T>;
}

export interface IvtActionPayload<T = any> extends EntityActionPayload {
  queryParams: IvtQueryParams;
  hasMore: boolean;
}

export class AdditionalEntityCollectionReducerMethods<T> extends EntityCollectionReducerMethods<T> {
  constructor(public entityName: string, public definition: EntityDefinition<T>) {
    super(entityName, definition);
  }

  protected queryMany(collection: IvtEntityCollection<T>, action: IvtEntityAction<T[]>): IvtEntityCollection<T> {
    const entityCollection = super.queryMany(collection, action) as IvtEntityCollection;
    return {
      ...entityCollection,
      queryParams: {
        ...entityCollection.queryParams,
        ...action.payload.data,
      },
    };
  }

  protected queryManySuccess(collection: IvtEntityCollection<T>, action: IvtEntityAction<T[]>): IvtEntityCollection<T> {
    let entityCollection = super.queryManySuccess(collection, action) as IvtEntityCollection;
    if (entityCollection.queryParams.resetList) {
      entityCollection = super.queryManySuccess(super.removeAll(collection, action), action) as IvtEntityCollection;
    }
    return {
      ...entityCollection,
      hasMore: action.payload.data.length >= DEFAULT_LIMIT_SIZE,
      queryParams: {
        ...entityCollection.queryParams,
        offset: entityCollection.ids.length,
      },
    };
  }

  protected queryByKeySuccess(
    collection: IvtEntityCollection<T>,
    action: IvtEntityAction<T[]>
  ): IvtEntityCollection<T> {
    return {
      ...collection,
      currentItem: action.payload.data,
      loading: false,
    };
  }

  protected saveAddOne(collection: IvtEntityCollection<T>, action: IvtEntityAction<T[]>): IvtEntityCollection<T> {
    return collection;
  }

  protected saveAddOneSuccess(
    collection: IvtEntityCollection<T>,
    action: IvtEntityAction<T[]>
  ): IvtEntityCollection<T> {
    return {
      ...collection,
      currentItem: action.payload.data,
    };
  }

  protected saveUpdateOne(collection: IvtEntityCollection<T>, action: IvtEntityAction<T[]>): IvtEntityCollection<T> {
    return collection;
  }

  protected saveDeleteOne(collection: IvtEntityCollection<T>, action: IvtEntityAction<T[]>): IvtEntityCollection<T> {
    return collection;
  }

  protected saveDeleteOneError(
    collection: IvtEntityCollection<T>,
    action: IvtEntityAction<T[]>
  ): IvtEntityCollection<T> {
    return collection;
  }

  protected removeOne(collection: IvtEntityCollection<T>, action: IvtEntityAction<T[]>): IvtEntityCollection<T> {
    if (!action.payload.data) {
      return {
        ...collection,
        currentItem: null,
      };
    } else {
      return super.removeOne(collection, action) as IvtEntityCollection;
    }
  }
}
