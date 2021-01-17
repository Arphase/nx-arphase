import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Group } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent extends IvtFormComponent<Group> {
  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
