import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapToSelectOptionsSync<T>(
  values: T[],
  mappingFn: (value: T, index: number, array: T[]) => { label: string; value: unknown }
): { label: string; value: unknown }[] {
  return Array.isArray(values) ? values.map(mappingFn) : [];
}

export function mapToSelectOptions<T>(
  mappingFn: (value: T) => { label: string; value: unknown }
): OperatorFunction<T[], { label: string; value: unknown }[]> {
  return map(values => mapToSelectOptionsSync(values, mappingFn));
}
