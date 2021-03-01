import { IvtCollectionResponse } from '../models';

export function createCollectionResponse<T>(
  collection: T[],
  pageSize: number,
  pageIndex: number,
  total: number
): IvtCollectionResponse<T> {
  return {
    info: {
      pageSize,
      pageIndex,
      total,
      pageStart: total ? (pageIndex - 1) * pageSize + 1 : 0,
      pageEnd: collection.length < total ? (pageIndex - 1) * pageSize + pageSize : total,
      last: collection.length < pageSize,
    },
    results: collection,
  };
}
