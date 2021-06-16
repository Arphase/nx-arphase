import dayjs from 'dayjs';
import { ValueTransformer } from 'typeorm';

export const dateTransformer: ValueTransformer = {
  to: value => value,
  from: value => (value ? dayjs(value).toISOString() : null),
};
