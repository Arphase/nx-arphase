export function convertStringToNumberArray(value: string): number[] {
  return value.split(',').map(id => Number(id));
}
