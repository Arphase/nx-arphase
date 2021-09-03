import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class CategoryCollectionService extends ApsCollectionService<Category> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Category', serviceElementsFactory);
  }
}
