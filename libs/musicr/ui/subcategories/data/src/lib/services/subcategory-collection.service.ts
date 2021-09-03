import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { Subcategory } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class SubcategoryCollectionService extends ApsCollectionService<Subcategory> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Subcategory', serviceElementsFactory);
  }
}
