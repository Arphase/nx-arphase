import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'folio',
})
export class IvtFolioPipe implements PipeTransform {
  transform(value: number): unknown {
    const zeros = 5 - String(value).length;
    return `${new Array(zeros).join('0')}${value}`;
  }
}
