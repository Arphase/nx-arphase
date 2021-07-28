import { Transform } from 'class-transformer';

export function TransformEmail() {
  return Transform(({ obj, key }) => String(obj[key]).toLowerCase().trim());
}
