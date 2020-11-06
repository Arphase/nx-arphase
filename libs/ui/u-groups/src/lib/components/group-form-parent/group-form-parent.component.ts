import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Group } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { GroupForm } from '../../services/group-form.service';

@Component({
  selector: 'ivt-group-form-parent',
  templateUrl: './group-form-parent.component.html',
  styleUrls: ['./group-form-parent.component.scss']
})
export class GroupFormParentComponent extends IvtFormComponent<Group> implements OnChanges {

  title = 'GROUPS.GROUP_FORM.TITLE';
  submitted = false;

  constructor(/*private groupFormService: GroupFormService*/) {
    super();
    //this.form = this.groupFormService.form;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item) {
      if (this.item && this.item.id) {
        this.title = this.item.name;
      }

      //this.groupFormService.loadGroup(this.item);
    }
  }

  /*
  transformFromForm(values: GroupForm) {
    return this.groupFormService.transformFromForm(values);
  }
  */

  submit() {
    this.submitted = true;

    super.submit();
  }

}
