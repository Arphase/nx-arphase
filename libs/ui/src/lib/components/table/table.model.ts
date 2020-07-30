export type SortOrder = 'asc' | 'desc';

export interface SortEvent {
  value?: string;
  order?: SortOrder;
}

export type IvtCellType = '*' | 'number' | 'date' | 'currency' | 'actions';

export type IvtColumns<T = any> = IvtColumn<T>[];

export interface IvtCellContext<T> {
  index: number;
  value: any;
  row: T;
  column: IvtColumn;
}

export interface IvtColumn<T = any> {
  prop?: string;
  type?: IvtCellType;
  colSize?: number | 'auto';
  alignment?: 'left' | 'center' | 'right';
  label?: string;
  sortable?: boolean;
}
