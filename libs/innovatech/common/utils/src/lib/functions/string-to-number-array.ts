export function convertStringToNumberArray(value: string): number[] {
  return Array.isArray(value) ? value : value.split(',').map(id => Number(id));
}
