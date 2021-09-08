import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { Photo } from '@musicr/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class PhotoCollectionService extends ApsCollectionService<Photo> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Photo', serviceElementsFactory);
  }
}
