import { Select } from '@ivt/c-data';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapToSelectOptions<T>(mappingFn: (value: T) => Select): OperatorFunction<T[], Select[]> {
  return map(values => (Array.isArray(values) ? values.map(mappingFn) : []));
}
