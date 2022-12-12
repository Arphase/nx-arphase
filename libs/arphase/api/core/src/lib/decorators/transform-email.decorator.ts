import { Transform } from 'class-transformer';

export function TransformEmail() {
  return Transform(({ obj }) => String(obj.email).toLowerCase().trim());
}
