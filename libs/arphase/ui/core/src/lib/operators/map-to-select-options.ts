import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapToSelectOptionsSync<T>(
  values: T[],
  mappingFn: (value: T, index: number, array: T[]) => NzSelectOptionInterface
): NzSelectOptionInterface[] {
  return Array.isArray(values) ? values.map(mappingFn) : [];
}

export function mapToSelectOptions<T>(
  mappingFn: (value: T) => NzSelectOptionInterface
): OperatorFunction<T[], NzSelectOptionInterface[]> {
  return map(values => mapToSelectOptionsSync(values, mappingFn));
}
