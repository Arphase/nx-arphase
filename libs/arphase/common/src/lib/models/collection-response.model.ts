export interface ApsCollectionResponse<T> {
  info: ApsCollectionResponseInfo;
  results: T[];
}

export interface ApsCollectionResponseInfo {
  total: number;
  pageIndex: number;
  pageSize: number;
  pageStart: number;
  pageEnd: number;
  last: boolean;
}
