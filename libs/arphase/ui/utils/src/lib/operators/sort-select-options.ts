import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function sortSelectOptionsAlphabetical(): OperatorFunction<
  { label: string; value: unknown }[],
  { label: string; value: unknown }[]
> {
  return map(values => sortSelectOptions(values));
}

export function sortSelectOptions(options: { label: string; value: unknown }[]): { label: string; value: unknown }[] {
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
