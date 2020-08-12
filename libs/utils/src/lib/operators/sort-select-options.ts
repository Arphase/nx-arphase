import { Select } from '@ivt/data';

export function sortSelectOptions(options: Select[]): Select[] {
  return options.sort((a, b) => {
    const aLabel = a.label?.toLowerCase();
    const bLabel = b.label?.toLowerCase();

    if (aLabel < bLabel) {
      return -1;
    }

    if (aLabel > bLabel) {
      return 1;
    }

    return 0;
  });
}
