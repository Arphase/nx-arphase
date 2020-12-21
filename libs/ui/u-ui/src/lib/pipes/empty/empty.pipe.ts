import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty',
})
export class IvtEmptyPipe implements PipeTransform {
  transform(value: string): string {
    return value || 'N/A';
  }
}
