import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, setFormArrayValue } from '@arphase/ui/forms';
import { PriceOption } from '@musicr/domain';

import { createPriceOptionForm } from '../price-option-form/price-option-form.component';

@Component({
  selector: 'mrl-price-options-form',
  templateUrl: './price-options-form.component.html',
  styleUrls: ['./price-options-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceOptionsFormComponent extends ApsFormComponent<PriceOption[]> implements OnChanges {
  @Input() deletedItemIndex: number;
  @Output() removePhoto = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<{ item: PriceOption; index: number }>();

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
      setFormArrayValue(this.formArray, this.item, item => createPriceOptionForm(item));
    }

    if (changes.deletedItemIndex && this.deletedItemIndex !== null) {
      this.formArray.removeAt(this.deletedItemIndex);
    }
  }

  addPriceOption(): void {
    this.formArray.push(createPriceOptionForm());
  }

  removePriceOption(index: number): void {
    const priceOptionControl = (this.formArray.at(index) as UntypedFormGroup).getRawValue() as PriceOption;
    priceOptionControl.id ? this.deleteItem.emit({ item: priceOptionControl, index }) : this.formArray.removeAt(index);
  }
}
