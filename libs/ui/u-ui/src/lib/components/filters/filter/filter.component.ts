import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ivt-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFilterComponent<T = any> {
  @Input() label: string;
  @Output() filterItems = new EventEmitter<T>();
  control: FormControl | FormGroup;
  mappedTitle: string;
  active = false;
}
