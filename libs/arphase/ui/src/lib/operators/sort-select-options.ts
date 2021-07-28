import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function sortSelectOptionsAlphabetical(): OperatorFunction<
  NzSelectOptionInterface[],
  NzSelectOptionInterface[]
> {
  return map(values => sortSelectOptions(values));
}

export function sortSelectOptions(options: NzSelectOptionInterface[]): NzSelectOptionInterface[] {
  return options.sort((a, b) => {
    const aLabel = (a.label as string)?.toLowerCase();
    const bLabel = (b.label as string)?.toLowerCase();

    if (aLabel < bLabel) {
      return -1;
    }

    if (aLabel > bLabel) {
      return 1;
    }

    return 0;
  });
}
