import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class ApsDirtyFormGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private modalService: NzModalService) {}

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if (component.canDeactivate()) {
      return true;
    } else {
      return this.modalService.confirm({
        nzContent:
          'Tiene cambios que no han sido guardados. Presione cancelar para seguir dentro de la forma y guardar sus cambios o presione aceptar para salir de esta página',
        nzOnOk: () => true,
      }).afterClose;
    }
  }
}
