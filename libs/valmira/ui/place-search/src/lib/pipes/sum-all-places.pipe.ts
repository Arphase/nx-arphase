import { Pipe, PipeTransform } from '@angular/core';
import { PlaceCategories } from '@valmira/domain';

@Pipe({
  name: 'sumAllPlaces',
})
export class SumAllPlacesPipe implements PipeTransform {
  transform(value: Record<PlaceCategories, { category: PlaceCategories; amount: number }>): unknown {
    return Object.values(value).reduce((sum, { amount }) => sum + Number(amount), 0);
  }
}
