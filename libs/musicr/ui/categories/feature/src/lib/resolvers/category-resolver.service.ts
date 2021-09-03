import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { CategoryCollectionService } from '@musicr/ui/categories/data';

@Injectable({ providedIn: 'root' })
export class CategoryResolverService extends ApsEntityResolverService<Category> {
  constructor(protected promocodeCollectionService: CategoryCollectionService) {
    super(promocodeCollectionService);
  }
}
