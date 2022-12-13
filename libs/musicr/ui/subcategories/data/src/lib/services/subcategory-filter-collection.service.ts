import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/data';
import { filterNilArray, mapToSelectOptions } from '@arphase/ui/utils';
import { Subcategory } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SubcategoryFilterCollectionService extends ApsCollectionService<Subcategory> {
  options$ = this.entities$.pipe(
    filterNilArray(),
    mapToSelectOptions(subcategory => ({
      label: `${subcategory.name}`,
      value: subcategory.id,
    }))
  );
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('SubcategoryFilter', serviceElementsFactory);
  }
}
