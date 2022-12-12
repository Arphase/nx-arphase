import { Transform } from 'class-transformer';

export function Trim(key: string) {
  return Transform(({ obj }) => (obj[key] ? String(obj[key]).trim() : obj[key]));
}
