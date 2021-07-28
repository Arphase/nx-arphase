import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui';
import { Group } from '@innovatech/common/domain';
import { GroupCollectionService } from '@innovatech/ui/groups/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { GroupFormService } from '../../services/group-form.service';

@Component({
  selector: 'ivt-group-form-container',
  templateUrl: './group-form-container.component.html',
  styleUrls: ['./group-form-container.component.less'],
  providers: [GroupFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormContainerComponent extends ApsFormContainerComponent<Group> {
  successUrl = '/spa/groups';
  createSuccessMessage = 'El grupo se ha creado con éxito';
  updateSuccessMessage = 'El grupo se ha actualizado con éxito';
  form = this.groupFormService.form;

  constructor(
    protected groupCollectionService: GroupCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private groupFormService: GroupFormService
  ) {
    super(groupCollectionService, router, messageService);
  }
}
