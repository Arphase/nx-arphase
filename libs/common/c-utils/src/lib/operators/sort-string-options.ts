export function sortStringOptions(options: string[]): string[] {
  return options.sort((a, b) => {
    const aLabel = a?.toLowerCase();
    const bLabel = b?.toLowerCase();

    if (aLabel < bLabel) {
      return -1;
    }

    if (aLabel > bLabel) {
      return 1;
    }

    return 0;
  });
}
