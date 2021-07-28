import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui';
import { Category } from '@valmira/domain';
import { CategoryCollectionService } from '@valmira/ui/categories/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[vmaCategorySelect]',
})
export class CategorySelectDirective extends ApsCollectionSelectDirective<Category> {
  sortValue = [{ key: 'category.name', value: 'ascend' }];
  constructor(
    protected host: NzSelectComponent,
    protected categoryCollectionService: CategoryCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {
    super(host, categoryCollectionService, ngControl, cdr);
  }
}
