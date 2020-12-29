import { QueryParams } from '@ngrx/data';

export interface IvtQueryParams extends QueryParams {
  [name: string]: string | string[];
}
