import { Pipe, PipeTransform } from '@angular/core';

export type MapperPipeFunction<T, TResult> = (item: T, ...args: unknown[]) => TResult;

@Pipe({ name: 'mapper', standalone: true })
export class MapperPipe implements PipeTransform {
  transform<T, TResult>(value: T, mapper: MapperPipeFunction<T, TResult>, ...args: unknown[]): TResult {
    return mapper(value, ...args);
  }
}
