import { Injectable } from '@angular/core';
import { ApsCollectionService, filterNilArray, mapToSelectOptions } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class CategoryFilterCollectionService extends ApsCollectionService<Category> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(category => ({
      label: `${category.name}`,
      value: category.id,
    }))
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CategoryFilter', serviceElementsFactory);
  }
}
