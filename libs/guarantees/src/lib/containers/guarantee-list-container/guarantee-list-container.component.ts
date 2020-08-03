import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Guarantee } from '@ivt/data';
import { GuaranteeCollectionService } from '@ivt/state';
import { IvtListContainerComponent } from '@ivt/ui';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListContainerComponent extends IvtListContainerComponent<
  Guarantee
> {
  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService
  ) {
    super(guaranteeCollectionService);
  }
}
