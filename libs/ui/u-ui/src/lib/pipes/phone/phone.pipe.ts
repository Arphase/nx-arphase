import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class IvtPhonePipe implements PipeTransform {
  transform(value: unknown): unknown {
    const phoneString = String(value).trim();

    const lada = phoneString.substr(0, 2);
    const first = phoneString.substr(2, 4);
    const second = phoneString.substr(6, 4);

    return `(${lada}) ${first} ${second}`;
  }
}
