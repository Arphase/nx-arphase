export type ApsColumns = ApsColumn[];

export interface ApsColumn {
  prop?: string;
  label: string;
  sortFn?: (a, b) => number;
  colSizes: ApsColumnSizes;
}

export interface ApsColumnSizes {
  [BoostrapGridBreakpoints.xs]?: number;
  [BoostrapGridBreakpoints.sm]?: number;
  [BoostrapGridBreakpoints.md]?: number;
  [BoostrapGridBreakpoints.lg]?: number;
  [BoostrapGridBreakpoints.xl]?: number;
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
