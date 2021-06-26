export type ApsColumns = ApsColumn[];

export interface ApsColumn {
  prop?: string;
  label: string;
  sortFn?: (a, b) => number;
  colSizes?: ApsColumnSizes;
  flex?: string;
}

export interface ApsColumnSizes {
  [GridBreakpoints.xs]?: number | string;
  [GridBreakpoints.sm]?: number | string;
  [GridBreakpoints.md]?: number | string;
  [GridBreakpoints.lg]?: number | string;
  [GridBreakpoints.xl]?: number | string;
}

export enum GridBreakpoints {
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
