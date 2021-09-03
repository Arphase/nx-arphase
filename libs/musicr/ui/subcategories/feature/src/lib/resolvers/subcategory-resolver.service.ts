import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Subcategory } from '@musicr/domain';
import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';

@Injectable({ providedIn: 'root' })
export class SubcategoryResolverService extends ApsEntityResolverService<Subcategory> {
  constructor(protected subcategoryCollectionService: SubcategoryCollectionService) {
    super(subcategoryCollectionService);
  }
}
