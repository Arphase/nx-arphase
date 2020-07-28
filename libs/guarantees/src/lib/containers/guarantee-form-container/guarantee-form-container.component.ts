import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fromGuarantees } from '@innovatech/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ivt-guarantee-form-container',
  templateUrl: './guarantee-form-container.component.html',
  styleUrls: ['./guarantee-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeFormContainerComponent {
  constructor(private store: Store<any>) {}

  onGetGuaranteePdf(payload) {
    this.store.dispatch(fromGuarantees.actions.getGuaranteePdf(payload));
  }
}
