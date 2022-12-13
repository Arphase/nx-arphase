import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, setFormArrayValue } from '@arphase/ui/forms';
import { AdditionalOption } from '@musicr/domain';

export function createAdditionalOptionForm(additionalOption?: AdditionalOption): UntypedFormGroup {
  const form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    price: new UntypedFormControl(null, ApsValidators.required),
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
