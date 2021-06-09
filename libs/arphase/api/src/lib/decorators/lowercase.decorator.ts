import { Transform } from 'class-transformer';

export function LowerCase() {
  return Transform(({ obj, key }) => String(obj[key]).toLowerCase());
}
