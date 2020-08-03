import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Guarantee } from '@ivt/data';
import { GuaranteeCollectionService } from '@ivt/state';
import { IvtFormContainerComponent } from '@ivt/ui';

@Component({
  selector: 'ivt-guarantee-form-container',
  templateUrl: './guarantee-form-container.component.html',
  styleUrls: ['./guarantee-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormContainerComponent extends IvtFormContainerComponent<
  Guarantee
> {
  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService
  ) {
    super(guaranteeCollectionService);
  }
}
