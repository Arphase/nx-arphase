import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { IvtConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class IvtDirtyFormGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if (component.canDeactivate()) {
      return true;
    } else {
      return this.dialog
        .open(IvtConfirmationDialogComponent, {
          data: {
            message:
              'Tiene cambios que no han sido guardados. Presione cancelar para seguir dentro de la forma y guardar sus cambios o presione aceptar para salir de esta página',
          },
        })
        .afterClosed();
    }
  }
}
