import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty',
})
export class IvtEmptyPipe implements PipeTransform {
  transform(value: any): unknown {
    return value ? value : 'N/A';
  }
}
