export type ApsColumns = ApsColumn[];

export interface ApsColumn {
  prop?: string;
  label: string;
  sortFn?: (a, b) => number;
  colSizes?: ApsColumnSizes;
  flex?: string;
}

export interface ApsColumnSizes {
  [BoostrapGridBreakpoints.xs]?: number | string;
  [BoostrapGridBreakpoints.sm]?: number | string;
  [BoostrapGridBreakpoints.md]?: number | string;
  [BoostrapGridBreakpoints.lg]?: number | string;
  [BoostrapGridBreakpoints.xl]?: number | string;
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
