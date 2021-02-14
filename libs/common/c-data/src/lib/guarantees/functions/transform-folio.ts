export function transformFolio(value: number): unknown {
  const zeros = 5 - String(value).length;
  return `${new Array(zeros).join('0')}${value}`;
}
