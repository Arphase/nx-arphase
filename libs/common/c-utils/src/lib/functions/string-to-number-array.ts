export function convertStringToNumberArray(value: string): number[] {
  console.log(value);
  return Array.isArray(value) ? value : value.split(',').map(id => Number(id));
}
