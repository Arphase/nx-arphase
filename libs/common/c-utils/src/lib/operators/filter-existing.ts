import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterExisting<T>(): MonoTypeOperatorFunction<T> {
  return filter(value => !!value);
}
