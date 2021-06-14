export interface IvtCollectionResponse<T> {
  info: IvtCollectionResponseInfo;
  results: T[];
}

export interface IvtCollectionResponseInfo {
  total: number;
  pageIndex: number;
  pageSize: number;
  pageStart: number;
  pageEnd: number;
  last: boolean;
}
