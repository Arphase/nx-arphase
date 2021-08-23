import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Photo } from '@valmira/domain';

@Injectable({
  providedIn: 'root',
})
export class PhotoCollectionService extends ApsCollectionService<Photo> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Photo', serviceElementsFactory);
  }
}
