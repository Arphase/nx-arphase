import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/core';
import { Place } from '@valmira/domain';
import { PlaceCollectionService } from '@valmira/ui/places/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createPlaceForm } from '../../components/place-form/place-form.component';
import { PhotoCollectionService } from '../../services/photo-collection.service';

@Component({
  selector: 'vma-place-form-container',
  templateUrl: './place-form-container.component.html',
  styleUrls: ['./place-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceFormContainerComponent extends ApsFormContainerComponent<Place> {
  form = createPlaceForm();
  createSuccessMessage = 'El alojamiento se ha creado';
  successUrl = '/spa/places';
  constructor(
    protected placeCollectionService: PlaceCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private photoCollectionService: PhotoCollectionService
  ) {
    super(placeCollectionService, router, messageService);
  }

  removePhoto(id: number): void {
    this.photoCollectionService.delete(id);
  }
}
