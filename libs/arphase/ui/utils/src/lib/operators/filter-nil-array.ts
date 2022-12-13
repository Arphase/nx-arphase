import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterNilArray<T>(): MonoTypeOperatorFunction<T> {
  return filter(value => value != null && Array.isArray(value));
}
