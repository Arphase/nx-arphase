export type SortOrder = 'asc' | 'desc';

export interface SortEvent {
  value?: string;
  order?: SortOrder;
}

export type IvtCellType = '*' | 'number' | 'date' | 'currency' | 'actions';

export type IvtColumns = IvtColumn[];

export interface IvtCellContext<T> {
  index: number;
  value: string;
  row: T;
  column: IvtColumn;
}

export interface IvtColumn {
  prop?: string;
  type?: IvtCellType;
  colSizes?: IvtColumnSizes;
  alignment?: 'left' | 'center' | 'right';
  label?: string;
  sortable?: boolean;
  breakpointShow?: IvtBreakpointShow;
}

/**
 * Size of columns for different breakpoints
 */
export interface IvtColumnSizes {
  [BoostrapGridBreakpoints.xs]?: string;
  [BoostrapGridBreakpoints.sm]?: string;
  [BoostrapGridBreakpoints.md]?: string;
  [BoostrapGridBreakpoints.lg]?: string;
  [BoostrapGridBreakpoints.xl]?: string;
}

/**
 * When we want to hide a column
 */
export interface IvtBreakpointShow {
  [BoostrapGridBreakpoints.xs]?: boolean;
  [BoostrapGridBreakpoints.sm]?: boolean;
  [BoostrapGridBreakpoints.md]?: boolean;
  [BoostrapGridBreakpoints.lg]?: boolean;
  [BoostrapGridBreakpoints.xl]?: boolean;
}

export enum BoostrapGridBreakpoints {
  /**
   *  Extra small < 576px
   */
  xs = 'xs',
  /**
   * Small >= 576px
   */
  sm = 'sm',
  /**
   * Medium >= 768px
   */
  md = 'md',
  /**
   * Large >= 992px
   */
  lg = 'lg',
  /**
   * Extra large >= 1200px
   */
  xl = 'xl',
}
