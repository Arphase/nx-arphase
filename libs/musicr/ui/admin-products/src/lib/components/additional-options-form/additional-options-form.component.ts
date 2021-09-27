import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, setFormArrayValue } from '@arphase/ui/core';
import { AdditionalOption } from '@musicr/domain';

export function createAdditionalOptionForm(additionalOption?: AdditionalOption): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    price: new FormControl(null, ApsValidators.required),
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

  get formArray(): FormArray {
    return this.form as AbstractControl as FormArray;
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
    const additionalOptionControl = (this.formArray.at(index) as FormGroup).getRawValue() as AdditionalOption;
    additionalOptionControl.id
      ? this.deleteItem.emit({ item: additionalOptionControl, index })
      : this.formArray.removeAt(index);
  }
}
