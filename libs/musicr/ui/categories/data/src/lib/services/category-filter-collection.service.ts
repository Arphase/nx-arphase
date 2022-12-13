import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { filterNilArray, mapToSelectOptions } from '@arphase/ui/utils';
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
