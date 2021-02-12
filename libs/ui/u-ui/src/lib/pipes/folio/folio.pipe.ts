import { Pipe, PipeTransform } from '@angular/core';
import { transformFolio } from '@ivt/c-data';

@Pipe({
  name: 'folio',
})
export class IvtFolioPipe implements PipeTransform {
  transform(value: number): unknown {
    return transformFolio(value);
  }
}
