import { Injectable } from '@angular/core';
import { ApsCollectionService, filterNilArray, mapToSelectOptions } from '@arphase/ui';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Category } from '@valmira/domain';

@Injectable({ providedIn: 'root' })
export class CategoryCollectionService extends ApsCollectionService<Category> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(category => ({ label: `${category.name}`, value: category.id }))
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Category', serviceElementsFactory);
  }
}
