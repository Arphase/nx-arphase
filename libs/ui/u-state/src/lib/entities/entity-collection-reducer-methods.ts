import { IvtCollectionResponseInfo, IvtQueryParams } from '@ivt/c-data';
import {
  EntityAction,
  EntityActionPayload,
  EntityCollection,
  EntityCollectionReducerMethods,
  EntityDefinition,
} from '@ngrx/data';

export interface IvtEntityCollection<T> extends EntityCollection {
  queryParams: IvtQueryParams;
  currentItem: T;
  info: IvtCollectionResponseInfo;
}

export interface IvtEntityAction extends EntityAction {
  payload: IvtActionPayload;
}

export interface IvtActionPayload extends EntityActionPayload {
  queryParams: IvtQueryParams;
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
    const customAction = { ...action, payload: { ...action.payload, data: action.payload.data.results } };
    let entityCollection = super.queryManySuccess(collection, customAction) as IvtEntityCollection<T>;
    if (entityCollection.queryParams.resetList === String(true)) {
      entityCollection = super.queryManySuccess(
        super.removeAll(collection, customAction),
        customAction
      ) as IvtEntityCollection<T>;
    }
    return {
      ...entityCollection,
      info: action.payload.data.info,
    };
  }

  protected queryByKeySuccess(collection: IvtEntityCollection<T>, action: IvtEntityAction): IvtEntityCollection<T> {
    return {
      ...collection,
      currentItem: action.payload.data,
      loading: false,
    };
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
