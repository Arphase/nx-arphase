import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui';
import { Place } from '@valmira/domain';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createPlaceForm } from '../../components/place-form/place-form.component';
import { PlaceCollectionService } from '../../services/place-collection.service';

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
    protected messageService: NzMessageService
  ) {
    super(placeCollectionService, router, messageService);
  }
}
