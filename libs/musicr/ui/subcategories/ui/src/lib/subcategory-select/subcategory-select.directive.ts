import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui/core';
import { Subcategory } from '@musicr/domain';
import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[mrlSubcategorySelect]',
  standalone: false,
})
export class SubcategorySelectDirective extends ApsCollectionSelectDirective<Subcategory> {
  sortValue = [{ key: 'subcategory.name', value: 'ascend' }];
  constructor(
    protected host: NzSelectComponent,
    protected subcategoryCollectionService: SubcategoryCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
  ) {
    super(host, subcategoryCollectionService, ngControl, cdr);
  }
}
