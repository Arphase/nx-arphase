import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ApsFormComponent, ApsValidators, setFormArrayValue } from '@arphase/ui/forms';
import { AdditionalOption } from '@musicr/domain';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskDirective } from 'ngx-mask';

export function createAdditionalOptionForm(additionalOption?: AdditionalOption): UntypedFormGroup {
  const form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    price: new UntypedFormControl(null, ApsValidators.required),
    includedInPromotion: new FormControl<boolean>(null),
  });
  if (additionalOption) {
    form.patchValue(additionalOption);
  }
  return form;
}

@Component({
  selector: 'mrl-additional-options-form',
  templateUrl: './additional-options-form.component.html',
  styleUrls: ['./additional-options-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    NzButtonModule,
    NzCollapseModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzSwitchModule,
    NzToolTipModule,
    ReactiveFormsModule,
  ],
})
export class AdditionalOptionsFormComponent extends ApsFormComponent<AdditionalOption[]> implements OnChanges {
  @Input() deletedItemIndex: number;
  @Output() deleteItem = new EventEmitter<{ item: AdditionalOption; index: number }>();

  get formArray(): UntypedFormArray {
    return this.form as AbstractControl as UntypedFormArray;
  }

  /**
   * on changes
   * @param changes
   * Here I'm using the null equality because the index can be 0
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      setFormArrayValue(this.formArray, this.item, item => createAdditionalOptionForm(item));
    }

    if (changes.deletedItemIndex && this.deletedItemIndex !== null) {
      this.formArray.removeAt(this.deletedItemIndex);
    }
  }

  addAdditionalOption(): void {
    this.formArray.push(createAdditionalOptionForm());
  }

  removeAdditionalOption(index: number): void {
    const additionalOptionControl = (this.formArray.at(index) as UntypedFormGroup).getRawValue() as AdditionalOption;
    additionalOptionControl.id
      ? this.deleteItem.emit({ item: additionalOptionControl, index })
      : this.formArray.removeAt(index);
  }
}
