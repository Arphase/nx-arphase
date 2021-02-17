import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ivt-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtAutocompleteComponent implements OnInit {
  @Input() required: boolean;
  @Input() label: string;
  @Input() type: string;
  @Input() control: FormControl;
  @Input() options: string[] = [];
  filteredOptions$: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
