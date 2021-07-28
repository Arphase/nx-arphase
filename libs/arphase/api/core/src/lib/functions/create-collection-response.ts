import { ApsCollectionResponse } from '@arphase/common';

export function createCollectionResponse<T>(
  collection: T[],
  pageSize: number,
  pageIndex: number,
  total: number
): ApsCollectionResponse<T> {
  return {
    info: {
      pageSize,
      pageIndex,
      total,
      pageStart: total ? (pageIndex - 1) * pageSize + 1 : 0,
      pageEnd: collection.length < total ? (pageIndex - 1) * pageSize + pageSize : total,
      last: collection.length < pageSize || !collection.length,
    },
    results: collection,
  };
}
