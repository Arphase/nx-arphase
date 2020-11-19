import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '@ivt/c-data';
import { GroupCollectionService } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ivt-group-forms-container',
  templateUrl: './group-forms-container.component.html',
  styleUrls: ['./group-forms-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormsContainerComponent extends IvtFormContainerComponent<Group> {
  successUrl = '/spa/groups';
  createSuccessMessage = 'El grupo se ha creado con éxito';
  updateSuccessMessage = 'El grupo se ha actualizado con éxito';

  constructor(
    protected groupCollectionService: GroupCollectionService,
    protected router: Router,
    protected toastr: ToastrService
  ) {
    super(groupCollectionService, router, toastr);
  }
}
