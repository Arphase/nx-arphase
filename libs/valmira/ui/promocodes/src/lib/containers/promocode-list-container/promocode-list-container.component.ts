import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui';
import { Promocode } from '@valmira/domain';

import { PromocodeCollectionService } from '../../services/promocode-collection.service';
import { PromocodeDataService } from '../../services/promocode-data.service';

@Component({
  selector: 'vma-promocode-list-container',
  templateUrl: './promocode-list-container.component.html',
  styleUrls: ['./promocode-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromocodeListContainerComponent extends ApsListContainerComponent<Promocode> {
  constructor(
    protected promocodeCollectionService: PromocodeCollectionService,
    protected promocodeDataService: PromocodeDataService
  ) {
    super(promocodeCollectionService, promocodeDataService);
  }
}
