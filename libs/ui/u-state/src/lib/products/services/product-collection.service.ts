import { Injectable } from '@angular/core';
import { Product } from '@ivt/c-data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IvtCollectionService } from '../../core';
import { Select } from '@ivt/c-data';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService extends IvtCollectionService<Product> {
  options$ = this.entities$.pipe(
    mapToSelectOptions(product => ({ label: product.name, value: product.id }))
  );
  constructor(
    protected serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Product', serviceElementsFactory);
  }
}

export function mapToSelectOptions<T>(
  mappingFn: (value: T) => Select
): OperatorFunction<T[], Select[]> {
  return map(values => (Array.isArray(values) ? values.map(mappingFn) : []));
}
