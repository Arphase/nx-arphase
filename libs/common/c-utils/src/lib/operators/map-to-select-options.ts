import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapToSelectOptions<T>(
  mappingFn: (value: T) => NzSelectOptionInterface
): OperatorFunction<T[], NzSelectOptionInterface[]> {
  return map(values => (Array.isArray(values) ? values.map(mappingFn) : []));
}
