import { Transform } from 'class-transformer';

export function Trim() {
  return Transform(({ obj, key }) => String(obj[key]).trim());
}
