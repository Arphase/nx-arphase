import { Transform } from 'class-transformer';

export function TransformEmail() {
  return Transform((_, obj) => String(obj.email).toLowerCase().trim());
}
